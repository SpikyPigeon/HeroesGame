import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateCategoryInfoDto, CreateItemInfoDto, UpdateItemInfoDto} from "./item.dto";
import {CategoryEntity} from "./category.entity";
import {ItemService} from "./item.service";
import {ItemEntity} from "./item.entity";

@ApiTags("item")
@Controller()
export class ItemController {
	private readonly logger: Logger = new Logger(ItemController.name);

	constructor(private readonly items: ItemService) {
	}

	@ApiOkResponse({type: CategoryEntity, isArray: true})
	@Get("category")
	async getAllCategories(): Promise<Array<CategoryEntity>> {
		this.logger.log(`getAllCategories`);
		return await this.items.findAllCategories();
	}

	@ApiOkResponse({type: CategoryEntity})
	@Get("category/:id")
	async getOneCategory(@Param("id") id: number): Promise<CategoryEntity> {
		this.logger.log(`getOneCategory => ${id}`);
		return await this.items.findOneCategory(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: CategoryEntity})
	@ApiBody({type: CreateCategoryInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post("category")
	async createCategory(@Body() data: CreateCategoryInfoDto): Promise<CategoryEntity> {
		this.logger.log(`createCategory`);
		return await this.items.createCategory(data.name, data.description, data.parentId);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CategoryEntity})
	@ApiBody({type: CreateCategoryInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("category/:id")
	async updateCategory(@Param("id") id: number, @Body() data: Partial<CreateCategoryInfoDto>): Promise<CategoryEntity> {
		this.logger.log(`updateCategory => ${id}`);
		return await this.items.updateCategory(id, data.name, data.description, data.parentId);
	}

	@ApiOkResponse({type: ItemEntity, isArray: true})
	@Get()
	async getAllItems(): Promise<Array<ItemEntity>> {
		this.logger.log(`getAllItems`);
		return await this.items.findAllItems()
	}

	@ApiOkResponse({type: ItemEntity})
	@Get(":id")
	async getOneItem(@Param("id") id: number): Promise<ItemEntity> {
		this.logger.log(`getOneItem => ${id}`);
		return await this.items.findOneItem(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: ItemEntity})
	@ApiBody({type: CreateItemInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createItem(@Body() data: CreateItemInfoDto): Promise<ItemEntity> {
		this.logger.log(`createItem`);
		return await this.items.createItem(data.name, data.description, data.categoryId, data.image);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: ItemEntity})
	@ApiBody({type: UpdateItemInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateItem(@Param("id") id: number, @Body() data: Partial<UpdateItemInfoDto>): Promise<ItemEntity> {
		this.logger.log(`updateItem => ${id}`);
		return await this.items.updateItem(id, {...data});
	}
}
