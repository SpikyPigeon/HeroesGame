import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {CreateCategoryInfo, CreateItemInfo, UpdateItemInfo} from "./item.dto";
import {CategoryEntity} from "./category.entity";
import {ItemService} from "./item.service";
import {ItemEntity} from "./item.entity";

@ApiTags("item")
@Controller()
export class ItemController {
	constructor(private readonly items: ItemService) {
	}

	@ApiOkResponse({type: CategoryEntity, isArray: true})
	@Get("category")
	async getAllCategories(): Promise<Array<CategoryEntity>> {
		return await this.items.findAllCategories();
	}

	@ApiOkResponse({type: CategoryEntity})
	@Get("category/:id")
	async getOneCategory(@Param("id") id: number): Promise<CategoryEntity> {
		return await this.items.findOneCategory(id);
	}

	@ApiCreatedResponse({type: CategoryEntity})
	@ApiBody({type: CreateCategoryInfo})
	@Post("category")
	async createCategory(@Body() data: CreateCategoryInfo): Promise<CategoryEntity> {
		return await this.items.createCategory(data.name, data.description, data.parentId);
	}

	@ApiOkResponse({type: CategoryEntity})
	@ApiBody({type: CreateCategoryInfo})
	@Put("category/:id")
	async updateCategory(@Param("id") id: number, @Body() data: Partial<CreateCategoryInfo>): Promise<CategoryEntity> {
		return await this.items.updateCategory(id, data.name, data.description, data.parentId);
	}

	@ApiOkResponse({type: ItemEntity, isArray: true})
	@Get()
	async getAllItems(): Promise<Array<ItemEntity>> {
		return await this.items.findAllItems()
	}

	@ApiOkResponse({type: ItemEntity})
	@Get(":id")
	async getOneItem(@Param("id") id: number): Promise<ItemEntity> {
		return await this.items.findOneItem(id);
	}

	@ApiCreatedResponse({type: ItemEntity})
	@ApiBody({type: CreateItemInfo})
	@Post()
	async createItem(@Body() data: CreateItemInfo): Promise<ItemEntity> {
		return await this.items.createItem(data.name, data.description, data.categoryId);
	}

	@ApiOkResponse({type: ItemEntity})
	@ApiBody({type: UpdateItemInfo})
	@Put(":id")
	async updateItem(@Param("id") id: number, @Body() data: Partial<UpdateItemInfo>): Promise<ItemEntity> {
		return await this.items.updateItem(id, {...data});
	}
}
