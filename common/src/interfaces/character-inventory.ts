import {ItemRoll} from "./item-roll";
import {PlayerCharacter} from "./player-character";

export interface CharacterInventory {
	id: string;
	roll: ItemRoll;
	owner: PlayerCharacter;
	quantity: number;
}
