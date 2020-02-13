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
	Theme
} from "@material-ui/core";

import {useStoreActions, useStoreState} from "../../store";
import {config, Encounter, Monster} from "heroes-common";

type MonsterFight = Monster & { health: number };

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		healthBar: {
			backgroundColor: red["800"],
		},
	}),
);

interface MonsterCardProps {
	monster: MonsterFight;
	onFight: (monster: MonsterFight) => void;
}

const MonsterCard: FunctionComponent<MonsterCardProps> = ({monster, onFight}) => {
	const [raised, setRaised] = useState(false);
	const classes = useStyles();

	const {monster: cfg} = config;
	const maxHealth = cfg.calculate.health(monster.vitality);

	return <Card raised={raised} square>
		<CardActionArea
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() => setRaised(false)}
			onClick={() => onFight(monster)}
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

	const fight = (monster: MonsterFight) => {
		console.log(`FIGHT ${monster.name}`);
		monster.health -= 10;
		update();
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
						<MonsterCard monster={value} onFight={fight}/>
					</Grid>
				))}
			</Grid>
		</CardContent>
	</Card>;
};
