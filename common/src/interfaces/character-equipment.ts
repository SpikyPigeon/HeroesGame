import {PlayerCharacter} from "./player-character";
import {ItemRoll} from "./item-roll";

export interface CharacterEquipment {
	player: PlayerCharacter;
	headSlot: ItemRoll;
	chestSlot: ItemRoll;
	beltSlot: ItemRoll;
	bootSlot: ItemRoll;
	leftHandSlot: ItemRoll;
	rightHandSlot: ItemRoll;
	ring1Slot: ItemRoll;
	ring2Slot: ItemRoll;
	neckSlot: ItemRoll;
	bagSlot: ItemRoll;
	artifactSlot: ItemRoll;
}
