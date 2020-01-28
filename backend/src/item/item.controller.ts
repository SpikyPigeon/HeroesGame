import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ItemService} from "./item.service";
import {ItemEntity} from "./item.entity";
import {ItemRarity} from "heroes-common";
import {CategoryEntity} from "./category.entity";

interface CreateCategoryInfo {
	name: string;
	description: string;
	parentId: number | undefined;
}

interface CreateItemInfo {
	name: string;
	description: string;
	categoryId: number;
}

interface UpdateItemInfo {
	name: string;
	description: string;
	categoryId: string;
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

@Controller()
export class ItemController {
	constructor(private readonly items: ItemService) {
	}

	@Get("category")
	async getAllCategories(): Promise<Array<CategoryEntity>> {
		return await this.items.findAllCategories();
	}

	@Get("category/:id")
	async getOneCategory(@Param("id") id: number): Promise<CategoryEntity> {
		return await this.items.findOneCategory(id);
	}

	@Post("category")
	async createCategory(@Body() data: CreateCategoryInfo): Promise<CategoryEntity> {
		return await this.items.createCategory(data.name, data.description, data.parentId);
	}

	@Put("category/:id")
	async updateCategory(@Param("id") id: number, @Body() data: Partial<CreateCategoryInfo>): Promise<CategoryEntity> {
		return await this.items.updateCategory(id, data.name, data.description, data.parentId);
	}

	@Get()
	async getAllItems(): Promise<Array<ItemEntity>> {
		return await this.items.findAllItems()
	}

	@Get(":id")
	async getOneItem(@Param("id") id: number): Promise<ItemEntity> {
		return await this.items.findOneItem(id);
	}

	@Post()
	async createItem(@Body() data: CreateItemInfo): Promise<ItemEntity> {
		return await this.items.createItem(data.name, data.description, data.categoryId);
	}

	@Put(":id")
	async updateItem(@Param("id") id: number, @Body() data: Partial<UpdateItemInfo>): Promise<ItemEntity> {
		return await this.items.updateItem(id, {...data});
	}
}
