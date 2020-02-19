import {ItemCategory} from "./item-category";

export type ItemRarity = "common" | "uncommon" | "rare" | "legendary" | "unique";

export interface Item {
	id: number;
	name: string;
	description: string;
	category: ItemCategory;
	rarity: ItemRarity;
	heal: number;
	strengthMod: number;
	dexterityMod: number;
	vitalityMod: number;
	intellectMod: number;
	criticalChanceMod: number;
	criticalDamageMod: number;
	dodgeChanceMod: number;
	healthMod: number;
	manaMod: number;
	armorMod: number;
	damageMod: number;
	itemDropMod: number;
	goldDropMod: number;
	inventorySpace: number;
	special: Object | null;
	skill: number;
	createdAt: Date;
	updatedAt: Date;
	stackLimit: number;
	image: string;
}
