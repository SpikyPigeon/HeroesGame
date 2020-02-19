import {ApiProperty} from "@nestjs/swagger";
import {CreateCategoryInfo, CreateItemInfo, ItemRarity, UpdateItemInfo} from "heroes-common";

export class CreateCategoryInfoDto implements CreateCategoryInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	description: string = "";

	@ApiProperty()
	parentId: number | undefined = undefined;
}

export class CreateItemInfoDto implements CreateItemInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	description: string = "";

	@ApiProperty()
	categoryId: number = 0;

	@ApiProperty()
	image: string = "";
}

export class UpdateItemInfoDto implements UpdateItemInfo {
	@ApiProperty({required: false})
	name: string = "";

	@ApiProperty({required: false})
	description: string = "";

	@ApiProperty({required: false})
	categoryId: number = 0;

	@ApiProperty({required: false})
	rarity: ItemRarity = "common";

	@ApiProperty({required: false})
	heal: number = 0;

	@ApiProperty({required: false})
	strengthMod: number = 0;

	@ApiProperty({required: false})
	dexterityMod: number = 0;

	@ApiProperty({required: false})
	vitalityMod: number = 0;

	@ApiProperty({required: false})
	intellectMod: number = 0;

	@ApiProperty({required: false})
	criticalChanceMod: number = 0;

	@ApiProperty({required: false})
	criticalDamageMod: number = 0;

	@ApiProperty({required: false})
	dodgeChanceMod: number = 0;

	@ApiProperty({required: false})
	healthMod: number = 0;

	@ApiProperty({required: false})
	manaMod: number = 0;

	@ApiProperty({required: false})
	armorMod: number = 0;

	@ApiProperty({required: false})
	damageMod: number = 0;

	@ApiProperty({required: false})
	itemDropMod: number = 0;

	@ApiProperty({required: false})
	goldDropMod: number = 0;

	@ApiProperty({required: false})
	inventorySpace: number = 0;

	@ApiProperty({required: false})
	special: Object = {};

	@ApiProperty({required: false})
	image: string = "";
}
