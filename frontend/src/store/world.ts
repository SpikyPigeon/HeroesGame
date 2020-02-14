import {action, Action, thunk, Thunk} from "easy-peasy";
import {Square, SquareContent, World} from "heroes-common";
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
	loadSquareContent: Thunk<WorldStore, LocationInfo, any, {}, Promise<SquareContent>>;
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

	loadSquareContent: thunk(async (state, payload): Promise<SquareContent> => {
		return await WorldService.loadSquareContent(payload.worldId, payload.x, payload.y);
	}),
};
