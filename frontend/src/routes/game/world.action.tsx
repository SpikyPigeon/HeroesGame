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
	Theme, Typography
} from "@material-ui/core";

import {useStoreActions, useStoreState} from "../../store";
import {config, Encounter, Monster} from "heroes-common";
import {Structure} from "heroes-common/src";

type MonsterFight = Monster & { health: number };

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		healthBar: {
			backgroundColor: red["800"],
		},
	}),
);

interface StructureCardProps {
	structures: Array<Structure>;
}

export const StructureCard: FunctionComponent<StructureCardProps> = ({structures}) => {
	const [raised, setRaised] = useState(false);

	if(structures.length < 1){
		return null;
	}
	else{
		return <Card style={{minHeight: 100, marginBottom: 8}}>
			<CardContent style={{padding: 3}}>
				<Grid container>
					<Grid item lg={3}>
						<CardHeader title={structures[0].name}
						            titleTypographyProps={{
							            align: "left",
							            variant: "h5",
						            }}
						/>
					</Grid>
					<Grid item lg={5}>
						<Typography align="left">
							{structures[0].description}
						</Typography>
					</Grid>
					<Grid item lg={4}>
						<Card raised={raised} square>
							<CardActionArea
								onMouseEnter={() => setRaised(true)}
								onMouseLeave={() => setRaised(false)}
							>
								<CardHeader title={"Shop Name"}
								            titleTypographyProps={{
								            	align: "center",
									            variant: "h6",
								            }}
								/>
								<Typography align="center">
									{"Shop description"}
								</Typography>
								<Typography align="center" variant="body2">
									{"Click to shop!"}
								</Typography>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</CardContent>
		</Card>;
	}
};

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

	return <Card raised={raised} square>
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
	</Card>;
};

interface WorldActionProps {
	encounters: Array<Encounter>;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters}) => {
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
			const charAtk = config.character.generate.damage;
			const charCrit = config.character.generate.isCritical;
			const charDog = config.character.generate.isDodge;
			const monAtk = config.monster.generate.damage;
			const monCrit = config.monster.generate.isCritical;
			const monDog = config.monster.generate.isDodge;
			const monExp = config.monster.calculate.exp(monster.level, character.level);

			if (!monDog(monster.dexterity)) {
				monster.health -= charAtk(character.strength, 0, 0, charCrit(character.dexterity, 0));
				if (monster.health <= 0) {
					updateChar({
						experience: character.experience + monExp,
					});
					monstersMod.removeAt(index);
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
