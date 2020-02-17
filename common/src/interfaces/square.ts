import {World} from "./world";

export interface Square {
	world: World;
	x: number;
	y: number;
	image: string | null;
}
