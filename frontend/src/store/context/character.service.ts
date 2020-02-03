import {Context} from "./index";
import {Avatar, PlayerCharacter} from "heroes-common";

export class CharacterService {
	static async listAllAvatars(): Promise<Array<Avatar>> {
		const response = await Context.get<Array<Avatar>>("/character/avatar");
		return response.data;
	}

	static async getAvatar(id: number): Promise<Avatar> {
		const response = await Context.get<Avatar>(`/character/avatar/${id}`);
		return response.data;
	}

	static async findMine(token: string): Promise<PlayerCharacter | null> {
		try {
			const response = await Context.get<PlayerCharacter>("/character/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.data;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}
