import {Context} from "./index";
import {
	Avatar, CharacterEquipment,
	CharacterInfo,
	CharacterInventory,
	CreateInventoryInfo,
	Item,
	ItemRoll,
	MoveCharacterInfo,
	PlayerCharacter,
	UpdateCharacterInfo
} from "heroes-common";

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
			return null;
		}
	}

	static async userHasChar(token: string): Promise<boolean> {
		try {
			const response = await Context.get<PlayerCharacter>("/character/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return response.status === 200;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	static async create(token: string, info: CharacterInfo): Promise<PlayerCharacter> {
		const response = await Context.post<PlayerCharacter>("/character", info, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async update(token: string, data: Partial<UpdateCharacterInfo>): Promise<PlayerCharacter> {
		const response = await Context.put<PlayerCharacter>("/character/me", {...data}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async moveTo(token: string, data: MoveCharacterInfo): Promise<PlayerCharacter> {
		const response = await Context.put<PlayerCharacter>("/character/me/move", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async findInventory(id: string): Promise<Array<CharacterInventory>> {
		const response = await Context.get<Array<CharacterInventory>>(`/character/inventory/owner/${id}`);
		return response.data;
	}

	static async updateInventory(token: string, id: string, quantity: number): Promise<CharacterInventory> {
		const response = await Context.put<CharacterInventory>(`/character/inventory/${id}/${quantity}`, null, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async deleteInventory(token: string, id: string): Promise<boolean> {
		const response = await Context.delete(`/character/inventory/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.status === 200;
	}

	static async createInventory(token: string, data: CreateInventoryInfo): Promise<CharacterInventory> {
		const response = await Context.post<CharacterInventory>("/character/inventory", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async createItemRoll(token: string, item: Item): Promise<ItemRoll> {
		const response = await Context.post<ItemRoll>(`item/roll/${item.id}`, null, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	}

	static async deleteItemRoll(token: string, roll: ItemRoll): Promise<Boolean> {
		const response = await Context.delete(`item/roll/${roll.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.status === 200;
	}

	static async updateEquipment(token: string, data: CharacterEquipment) {

	}
}
