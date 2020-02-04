import {action, Action, thunk, Thunk} from "easy-peasy";
import {Square, World} from "heroes-common";
import {WorldService} from "./context";

export interface WorldData {
	world: World;
	squares: Array<Square>;
}

export interface WorldStore {
	current: WorldData | null;
	setCurrent: Action<WorldStore, WorldData | null>;

	load: Thunk<WorldStore, number>;
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
};
