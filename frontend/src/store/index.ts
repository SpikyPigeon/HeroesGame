import {createStore, createTypedHooks} from "easy-peasy";
import {characterStore, CharacterStore} from "./character";
import {userStore, UserStore} from "./user";

export interface AppStore {
	character: CharacterStore;
	user: UserStore;
}

export const store = createStore<AppStore>({
	character: characterStore,
	user: userStore,
});

store.dispatch.user.getCurrent();

const hooks = createTypedHooks<AppStore>();

export const useStoreActions = hooks.useStoreActions;
export const useStoreDispatch = hooks.useStoreDispatch;
export const useStoreState = hooks.useStoreState;
