import {createStore, createTypedHooks} from "easy-peasy";
import {notificationStore, NotificationStore} from "./notification";
import {characterStore, CharacterStore} from "./character";
import {worldStore, WorldStore} from "./world";
import {userStore, UserStore} from "./user";
import {chatStore, ChatStore} from "./chat";

export interface LocationInfo {
	worldId: number;
	x: number;
	y: number;
}

export interface AppStore {
	notification: NotificationStore;
	character: CharacterStore;
	world: WorldStore;
	user: UserStore;
	chat: ChatStore;
}

export const store = createStore<AppStore>({
	notification: notificationStore,
	character: characterStore,
	world: worldStore,
	user: userStore,
	chat: chatStore,
});

store.dispatch.user.getCurrent();

const hooks = createTypedHooks<AppStore>();

export const useStoreActions = hooks.useStoreActions;
export const useStoreDispatch = hooks.useStoreDispatch;
export const useStoreState = hooks.useStoreState;
