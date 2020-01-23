import {Item} from "./item";
import {Encounter} from "./encounter";

export interface EncounterDrop {
	item: Item;
	encounter: Encounter;
	dropChance: number;
	minQuantity: number;
	maxQuantity: number;
}
