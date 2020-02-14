import {Square, SquareContent, World} from "heroes-common";
import {Context} from "./index";

export class WorldService {
	static async getWorld(id: number): Promise<World> {
		const response = await Context.get<World>(`/world/${id}`);
		return response.data;
	}

	static async getSquares(world: number): Promise<Array<Square>> {
		const response = await Context.get<Array<Square>>(`/world/square/${world}`);
		return response.data;
	}

	static async loadSquareContent(world: number, x: number, y: number): Promise<SquareContent> {
		const response = await Context.get<SquareContent>(`/world/square/${world}/${x}/${y}/content`);
		return response.data;
	}
}
