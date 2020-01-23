import {Square} from "./square";
import {Shop} from "./shop";

export type StructureType =
	"camp"
	| "village"
	| "city"
	| "fort"
	| "castle"
	| "dungeon"
	| "monster-camp"
	| "caravan"
	| "bank";

export interface Structure {
	id: number;
	square: Square;
	name: string;
	description: string;
	type: StructureType;
	shop: Shop | null;
}
