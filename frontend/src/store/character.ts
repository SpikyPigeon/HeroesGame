import {action, Action, thunk, Thunk} from "easy-peasy";
import {Avatar, CharacterInfo, MoveCharacterInfo, PlayerCharacter, UpdateCharacterInfo} from "heroes-common";
import {CharacterService} from "./context";
import {CharacterInventory} from "heroes-common/src";

export interface CharacterStore {
	character: PlayerCharacter | null;

	listAvatars: Thunk<CharacterStore, void, any, {}, Promise<Array<Avatar>>>;
	getAvatar: Thunk<CharacterStore, number, any, {}, Promise<Avatar>>;

	setCharacter: Action<CharacterStore, PlayerCharacter | null>;
	update: Action<CharacterStore, Partial<UpdateCharacterInfo>>;
	getMine: Thunk<CharacterStore>;
	userHasChar: Thunk<CharacterStore, void, any, {}, Promise<boolean>>;
	create: Thunk<CharacterStore, CharacterInfo>;
	moveTo: Thunk<CharacterStore, MoveCharacterInfo>;

	findInventory: Thunk<CharacterStore, string, any, {}, Promise<Array<CharacterInventory>>>;
	updateInventory: Thunk<CharacterStore, { id: string; quantity: number; }, any, {}, Promise<CharacterInventory>>;
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

	update: action((state, payload) => {
		if (state.character) {
			state.character = {...state.character, ...payload};

			if (state.character.currentHealth <= 0) {
				state.character.currentHealth = 0;
				state.character.isDead = true;
			}

			if (state.character.currentHealth > 0 && state.character.isDead) {
				state.character.isDead = false;
			}

			const token = localStorage.getItem("userJWT");
			if (token) {
				CharacterService.update(token, payload).catch(console.error);
			}
		}
	}),

	getMine: thunk(async state => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.findMine(token));
		} else {
			throw new Error("Not logged in!");
		}
	}),

	userHasChar: thunk(async () => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			return await CharacterService.userHasChar(token);
		} else {
			return false
		}
	}),

	create: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.create(token, payload));
		} else {
			throw new Error("Not logged in!");
		}
	}),

	moveTo: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.moveTo(token, payload));
		} else {
			throw new Error("Not logged in!");
		}
	}),

	findInventory: thunk(async (state, payload) => {
		return await CharacterService.findInventory(payload);
	}),

	updateInventory: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			return await CharacterService.updateInventory(token, payload.id, payload.quantity);
		} else {
			throw new Error("Not logged in!");
		}
	}),
};
