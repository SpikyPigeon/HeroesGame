import {ItemRarity} from "./item";

export interface UpdateItemInfo {
	name: string;
	description: string;
	categoryId: number;
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
	special: Object;
}
