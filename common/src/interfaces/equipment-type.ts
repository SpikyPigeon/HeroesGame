import {Item} from "./item";
import {getItemType, ItemType} from "./item-type";

export type EquipmentSlotType =
	"Head"
	| "Chest"
	| "Belt"
	| "Boot"
	| "Left Hand"
	| "Right Hand"
	| "Ring 1"
	| "Ring 2"
	| "Neck"
	| "Bag"
	| "Artifact";

export enum EquipmentType {
	Head,
	Chest,
	Belt,
	Boot,
	Hand,
	Ring,
	Neck,
	Bag,
	Artifact,
}

export function getEquipmentType(item: Item): EquipmentType {
	if(getItemType(item) === ItemType.Equipment){
		if(item.category.parent?.name === "Weapon" || item.category.name === "Weapon" || item.category.parent?.name === "Shield" || item.category.name === "Shield"){
			return EquipmentType.Hand;
		}
		if(item.category.parent?.name === "Head Piece" || item.category.name === "Head Piece"){
			return EquipmentType.Head;
		}
		if(item.category.parent?.name === "Belt Piece" || item.category.name === "Belt Piece"){
			return EquipmentType.Belt;
		}
		if(item.category.parent?.name === "Foot Piece" || item.category.name === "Foot Piece"){
			return EquipmentType.Boot;
		}
		if(item.category.parent?.name === "Ring" || item.category.name === "Ring"){
			return EquipmentType.Ring;
		}
		if(item.category.parent?.name === "Necklace" || item.category.name === "Necklace"){
			return EquipmentType.Neck;
		}
		if(item.category.parent?.name === "Bag" || item.category.name === "Bag"){
			return EquipmentType.Bag;
		}
		if(item.category.parent?.name === "Artifact" || item.category.name === "Artifact"){
			return EquipmentType.Artifact;
		}
		else {
			return EquipmentType.Chest;
		}
	} else {
		throw new Error("This item is not an Equipment!");
	}
}
