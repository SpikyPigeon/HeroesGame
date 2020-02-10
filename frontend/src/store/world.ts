import {action, Action, thunk, Thunk} from "easy-peasy";
import {Encounter, Square, World} from "heroes-common";
import {WorldService} from "./context";
import {LocationInfo} from "./index";

export interface WorldData {
	world: World;
	squares: Array<Square>;
}

export interface WorldStore {
	current: WorldData | null;
	setCurrent: Action<WorldStore, WorldData | null>;

	load: Thunk<WorldStore, number>;
	loadEncounters: Thunk<WorldStore, LocationInfo, any, {}, Promise<Array<Encounter>>>;
}

export const worldStore: WorldStore = {
	current: null,

	setCurrent: action((state, payload) => {
		state.current = payload;
	}),

	load: thunk(async (state, payload) => {
		state.setCurrent({
			world: await WorldService.getWorld(payload),
			squares: await WorldService.getSquares(payload),
		});
	}),

	loadEncounters: thunk(async (state, payload): Promise<Array<Encounter>> => {
		return await WorldService.getEncounters(payload.worldId, payload.x, payload.y);
	}),
};
