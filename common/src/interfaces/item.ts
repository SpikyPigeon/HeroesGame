import {ItemCategory} from "./item-category";

export interface Item {
	id: number;
	name: string;
	description: string;
	category: ItemCategory;
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
}
