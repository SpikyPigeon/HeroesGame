import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid} from "@material-ui/core";
import {createElement, FunctionComponent, useEffect} from "react";
import {useList} from "react-use";

import {useStoreActions, useStoreState} from "../../store";
import {config, Encounter, Monster} from "heroes-common";

type MonsterFight = Monster & { health: number };

interface WorldActionProps {
	encounters: Array<Encounter>;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters}) => {
	const updateChar = useStoreActions(state => state.character.update);
	const character = useStoreState(state => state.character.character);
	const [monsters, monstersMod] = useList<MonsterFight>([]);

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

	useEffect(() => {
		monstersMod.clear();
		if (encounters.length > 0) {
			spawnMonsters();
		}
	}, [encounters]);

	if (!character) {
		return null;
	}

	return <Card>
		<CardContent style={{padding: 3}}>
			<Grid container direction="row" justify="flex-start" spacing={1}>
				{monsters.map((value, index) => (
					<Grid item lg={2} key={index}>
						<Card variant="outlined">
							<CardActionArea>
								<CardHeader title={value.name} titleTypographyProps={{
									align: "center",
									variant: "subtitle1",
									noWrap: true,
								}}/>
								<CardMedia
									component="img"
									image={`/assets/monsters/${value.picture}`}
									height={128}
								/>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</CardContent>
	</Card>;
};
