import {Context} from "./index";
import {Square, World} from "heroes-common";

export class WorldService {
	static async getWorld(id: number): Promise<World> {
		const response = await Context.get<World>(`/world/${id}`);
		return response.data;
	}

	static async getSquares(world: number): Promise<Array<Square>> {
		const response = await Context.get<Array<Square>>(`/world/square/${world}`);
		return response.data;
	}
}
