import {createStore, createTypedHooks} from "easy-peasy";
import {characterStore, CharacterStore} from "./character";
import {worldStore, WorldStore} from "./world";
import {userStore, UserStore} from "./user";

export interface LocationInfo {
	worldId: number;
	x: number;
	y: number;
}

export interface AppStore {
	character: CharacterStore;
	world: WorldStore;
	user: UserStore;
}

export const store = createStore<AppStore>({
	character: characterStore,
	world: worldStore,
	user: userStore,
});

store.dispatch.user.getCurrent();

const hooks = createTypedHooks<AppStore>();

export const useStoreActions = hooks.useStoreActions;
export const useStoreDispatch = hooks.useStoreDispatch;
export const useStoreState = hooks.useStoreState;
