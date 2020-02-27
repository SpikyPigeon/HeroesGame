import {createElement, FunctionComponent, useEffect, useState} from "react";
import {red} from "@material-ui/core/colors";
import {useList, useUpdate} from "react-use";
import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Grid,
	LinearProgress,
	makeStyles,
	Theme,
	Tooltip
} from "@material-ui/core";

import {useStoreActions, useStoreState} from "../../store";
import {config, Encounter, EncounterDrop, Item, Monster} from "heroes-common";

type MonsterFight = Monster & { health: number; minGold: number; maxGold: number; drops: Array<EncounterDrop>; };

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		healthBar: {
			backgroundColor: red["800"],
		},
	}),
);

interface MonsterCardProps {
	index: number;
	monster: MonsterFight;
	onFight: (index: number) => void;
}

const MonsterCard: FunctionComponent<MonsterCardProps> = ({index, monster, onFight}) => {
	const [raised, setRaised] = useState(false);
	const classes = useStyles();

	const {monster: cfg} = config;
	const maxHealth = cfg.calculate.health(monster.vitality);

	return <Tooltip title={`Level : ${monster.level}`} placement="top" arrow>
		<Card raised={raised} square>
			<CardActionArea
				onMouseEnter={() => setRaised(true)}
				onMouseLeave={() => setRaised(false)}
				onClick={() => onFight(index)}
			>
				<CardHeader title={monster.name}
				            titleTypographyProps={{
					            align: "center",
					            variant: "subtitle1",
					            noWrap: true,
				            }}
				            subheader={
					            <LinearProgress
						            variant="determinate"
						            value={monster.health * 100 / maxHealth}
						            classes={{bar: classes.healthBar}}
					            />
				            }
				/>
				<CardMedia
					component="img"
					image={`/assets/monsters/${monster.picture}`}
					height={128}
				/>
			</CardActionArea>
		</Card>
	</Tooltip>;
};

interface WorldActionProps {
	encounters: Array<Encounter>;
	itemDroped: (item: Item, quantity: number) => void;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters, itemDroped}) => {
	const updateChar = useStoreActions(state => state.character.update);
	const character = useStoreState(state => state.character.character);
	const [monsters, monstersMod] = useList<MonsterFight>([]);
	const update = useUpdate();

	const spawnMonsters = () => {
		const {monster} = config;

		for (let i = 0; i < 12; ++i) {
			let m: MonsterFight | null = null;
			encounters.forEach(value => {
				if (!m && monster.generate.hasSpawned(value.spawnChance)) {
					m = {
						health: monster.calculate.health(value.monster.vitality),
						minGold: value.minGold,
						maxGold: value.maxGold,
						drops: value.drops,
						...value.monster,
					};
				}
			});

			if (m) {
				monstersMod.push(m);
			}
		}
	};

	const fight = (index: number) => {
		const monster = monsters[index];
		if (character) {
			const dStats = config.character.stats.calculate.derivedStats(character);

			const charAtk = config.character.generate.damage;
			const charCrit = config.character.generate.isCritical;
			const charDog = config.character.generate.isDodge;
			const monAtk = config.monster.generate.damage;
			const monCrit = config.monster.generate.isCritical;
			const monDog = config.monster.generate.isDodge;
			const monExp = config.monster.calculate.exp(monster.level, character.level);
			const monGold = config.monster.generate.goldDrop(monster.minGold, monster.maxGold);
			const monItems = config.monster.generate.itemDrops;

			if (!monDog(monster.dexterity)) {
				monster.health -= charAtk(dStats.strength, dStats.damage, dStats.criticalDamage, charCrit(dStats.dexterity, dStats.criticalChance));
				if (monster.health <= 0) {
					updateChar({
						experience: character.experience + monExp,
						gold: character.gold + Math.round(monGold * (1 + dStats.goldDrop / 10)),
					});
					monstersMod.removeAt(index);
					monItems(monster.drops, dStats.itemDrop).forEach(value => itemDroped(value.item, value.quantity));
				} else if (!charDog(character.dexterity, 0)) {
					updateChar({
						currentHealth: character.currentHealth - monAtk(monster.strength, monCrit(monster.dexterity)),
					});
				}
			}

			update();
		}
	};

	useEffect(() => {
		monstersMod.clear();
		if (encounters.length > 0) {
			spawnMonsters();
		}
	}, [encounters]);

	if (!character) {
		return null;
	}

	return <Card style={{minHeight: 390}}>
		<CardContent style={{padding: 3}}>
			<Grid container direction="row" justify="flex-start" spacing={1}>
				{monsters.map((value, index) => (
					<Grid item lg={2} key={index}>
						<MonsterCard index={index} monster={value} onFight={fight}/>
					</Grid>
				))}
			</Grid>
		</CardContent>
	</Card>;
};
