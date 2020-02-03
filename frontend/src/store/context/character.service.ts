import {Context} from "./index";
import {PlayerCharacter} from "heroes-common";

export class CharacterService {
	static async findMine(token: string) : Promise<PlayerCharacter | null> {
		try {
			const response = await Context.get<PlayerCharacter>("/character/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch(e) {
			console.error(e);
			return null;
		}
	}
}
