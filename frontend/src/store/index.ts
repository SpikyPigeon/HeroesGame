import {createStore, createTypedHooks} from "easy-peasy";
import {userStore, UserStore} from "./user";

export interface AppStore {
	user: UserStore,
}

export const store = createStore<AppStore>({
	user: userStore,
});

store.dispatch.user.getCurrent();

const hooks = createTypedHooks<AppStore>();

export const useStoreActions = hooks.useStoreActions;
export const useStoreDispatch = hooks.useStoreDispatch;
export const useStoreState = hooks.useStoreState;
