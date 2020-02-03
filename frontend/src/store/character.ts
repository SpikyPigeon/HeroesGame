import {PlayerCharacter} from "heroes-common";
import {action, Action, thunk, Thunk} from "easy-peasy";
import {CharacterService} from "./context";

export interface CharacterStore {
	character: PlayerCharacter | null;

	setCharacter: Action<CharacterStore, PlayerCharacter | null>;
	getMine: Thunk<CharacterStore>;
}

export const characterStore: CharacterStore = {
	character: null,

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
