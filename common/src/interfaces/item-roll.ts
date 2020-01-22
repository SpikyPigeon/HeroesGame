import {Item} from "./item";

export interface ItemRoll {
	id: string;
	item: Item;
	strengthMult: number;
	dexterityMult: number;
	vitalityMult: number;
	intellectMult: number;
	criticalChanceMult: number;
	criticalDamageMult: number;
	dodgeChanceMult: number;
	healthMult: number;
	manaMult: number;
	armorMult: number;
	damageMult: number;
	itemDropMult: number;
	goldDropMult: number;
	special: Object | null;
	createdAt: Date;
}
