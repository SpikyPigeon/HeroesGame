import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid} from "@material-ui/core";
import {createElement, FunctionComponent, useEffect, useState} from "react";
import {useList, useTimeoutFn} from "react-use";

import {LocationInfo, useStoreActions, useStoreState} from "../../store";
import {Encounter, Monster, config} from "heroes-common";

type MonsterFight = Monster & { health: number };

interface WorldActionProps {
	encounters: Array<Encounter>;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters}) => {
	const updateChar = useStoreActions(state => state.character.update);
	const character = useStoreState(state => state.character.character);
	const [charLocation, setCharLocation] = useState<LocationInfo | null>(null);
	const [monsters, monstersMod] = useList<MonsterFight>([]);

	const spawnMonsters = () => {
		if (encounters.length > 0) {
			encounters.forEach(value => {
				const {monster} = config;
				if (monster.generate.hasSpawned(value.spawnChance)) {
					monstersMod.push({
						health: monster.calculate.health(value.monster.vitality),
						...value.monster,
					});
				}
			});
		}
	};

	const [spawningReady, spawningCancel, spawningReset] = useTimeoutFn(() => {
		spawnMonsters();
		spawningReset();
	}, 5 * 1000);

	useEffect(() => {
		if (character) {
			if (!charLocation || (charLocation && (
				charLocation.worldId !== character.square.world.id ||
				charLocation.x !== character.square.x ||
				charLocation.y !== character.square.y))) {
				setCharLocation({
					worldId: character.square.world.id,
					x: character.square.x,
					y: character.square.y,
				});
			}
		}
	}, [character]);

	useEffect(() => {
		if (charLocation) {
			monstersMod.clear();
			spawningReset();
			spawnMonsters();
		}

		return () => monstersMod.clear();
	}, [charLocation]);

	if (!character) {
		return null;
	}

	return <Card>
		<CardContent>
			<Grid container direction="row" justify="space-evenly" spacing={2}>
				{monsters.map((value, index) => (
					<Grid item lg={3} key={index}>
						<Card>
							<CardActionArea>
								<CardHeader title={value.name}/>
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
