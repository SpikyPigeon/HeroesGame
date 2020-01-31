import {action, Action, computed, Computed, thunk, Thunk} from "easy-peasy";
import {CreateUserInfo, LoginInfo, ModifyUserProfile, PasswordChange, User} from "heroes-common";
import {UserService} from "./context";

export interface UserStore {
	user: User | null;

	setUser: Action<UserStore, User | null>;
	getCurrent: Thunk<UserStore>;
	register: Thunk<UserStore, CreateUserInfo>;
	login: Thunk<UserStore, LoginInfo>;
	logout: Action<UserStore>;
	modifyProfile: Thunk<UserStore, ModifyUserProfile>;
	changePassword: Thunk<UserStore, PasswordChange>;
}

export const userStore: UserStore = {
	user: null,

	setUser: action((state, payload) => {
		state.user = payload;
	}),

	getCurrent: thunk(async state => {
		if ("userJWT" in localStorage) {
			const token = localStorage.getItem("userJWT");
			if (token) {
				state.setUser(await UserService.getUserInfo(token));
			}
		}
	}),

	register: thunk(async (state, payload) => {
		try {
			await UserService.register(payload);
			await state.login({...payload});
		} catch (e) {
			console.error(e);
		}
	}),

	login: thunk(async (state, payload) => {
		state.logout();
		localStorage.setItem("userJWT", await UserService.login(payload));
		await state.getCurrent();
	}),

	logout: action(state => {
		if ("userJWT" in localStorage) {
			localStorage.removeItem("userJWT");
			state.user = null;
		}
	}),

	modifyProfile: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setUser(await UserService.modifyProfile(token, payload));
		}
	}),

	changePassword: thunk(async (state, payload): Promise<boolean> => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setUser(await UserService.changePassword(token, payload));
			return true;
		}

		return false;
	}),
};
