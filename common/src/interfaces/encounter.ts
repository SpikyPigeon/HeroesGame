import {Square} from "./square";
import {Monster} from "./monster";

export interface Encounter {
	id: number;
	square: Square;
	monster: Monster;
	spawnChance: number;
	minGold: number;
	maxGold: number;
}
