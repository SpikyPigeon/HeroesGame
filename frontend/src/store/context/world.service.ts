import {Encounter, Square, World} from "heroes-common";
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

	static async getEncounters(world: number, x: number, y: number): Promise<Array<Encounter>> {
		const response = await Context.get<Array<Encounter>>(`/world/encounter/${world}/${x}/${y}`);
		return response.data;
	}
}
