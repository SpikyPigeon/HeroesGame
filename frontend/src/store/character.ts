import {action, Action, thunk, Thunk} from "easy-peasy";
import {Avatar, PlayerCharacter} from "heroes-common";
import {CharacterService} from "./context";

export interface CharacterStore {
	character: PlayerCharacter | null;

	listAvatars: Thunk<CharacterStore, void, any, {}, Promise<Array<Avatar>>>;
	getAvatar: Thunk<CharacterStore, number, any, {}, Promise<Avatar>>;

	setCharacter: Action<CharacterStore, PlayerCharacter | null>;
	getMine: Thunk<CharacterStore>;
}

export const characterStore: CharacterStore = {
	character: null,

	listAvatars: thunk(async () => {
		return await CharacterService.listAllAvatars();
	}),

	getAvatar: thunk(async (state, payload) => {
		return await CharacterService.getAvatar(payload);
	}),

	setCharacter: action((state, payload) => {
		state.character = payload;
	}),

	getMine: thunk(async state => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.findMine(token));
		}
	}),
};
