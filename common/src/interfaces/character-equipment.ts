import {PlayerCharacter} from "./player-character";
import {ItemRoll} from "./item-roll";

export interface CharacterEquipment {
	player: PlayerCharacter;
	headSlot: ItemRoll | null;
	chestSlot: ItemRoll | null;
	beltSlot: ItemRoll | null;
	bootSlot: ItemRoll | null;
	leftHandSlot: ItemRoll | null;
	rightHandSlot: ItemRoll | null;
	ring1Slot: ItemRoll | null;
	ring2Slot: ItemRoll | null;
	neckSlot: ItemRoll | null;
	bagSlot: ItemRoll | null;
	artifactSlot: ItemRoll | null;
}
