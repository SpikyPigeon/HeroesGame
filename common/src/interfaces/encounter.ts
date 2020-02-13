import {EncounterDrop} from "./encounter-drop";
import {Monster} from "./monster";
import {Square} from "./square";

export interface Encounter {
	id: number;
	square: Square;
	monster: Monster;
	spawnChance: number;
	minGold: number;
	maxGold: number;
	drops: Array<EncounterDrop>;
}
