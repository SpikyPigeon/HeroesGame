import {Square} from "./square";
import {Shop} from "./shop";

export interface NonPlayerCharacter {
	id: number;
	square: Square;
	name: string;
	description: string;
	shop: Shop | null;
}
