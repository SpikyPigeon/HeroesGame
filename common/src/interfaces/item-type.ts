import {Item} from "./item";

export enum ItemType {
	Consumable,
	Equipment,
	Other,
}

export function getItemType(item: Item): ItemType {
	if (item.category.parent?.name === "Consumable" || item.category.name === "Consumable") {
		return ItemType.Consumable;
	}
	if (item.category.name === "Equipment" || item.category.parent?.name === "Equipment" || item.category.parent?.parent?.name === "Equipment") {
		return ItemType.Equipment;
	}
	return ItemType.Other;
}
