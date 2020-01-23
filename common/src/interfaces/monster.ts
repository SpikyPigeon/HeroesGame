import {MonsterType} from "./monster-type";

export interface Monster {
	id: number;
	name: string;
	description: string;
	type: MonsterType;
	level: number;
	strength: number;
	dexterity: number;
	vitality: number;
	intellect: number;
	picture: string;
}
