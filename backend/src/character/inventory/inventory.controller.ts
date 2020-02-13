import {Controller, Delete, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {InventoryService} from "./inventory.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {InventoryEntity} from "./inventory.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class InventoryController {
	private readonly logger: Logger = new Logger(InventoryController.name);

	constructor(private readonly inventories: InventoryService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: InventoryEntity})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(rollId: string, ownerId: string, quantity: number): Promise<InventoryEntity>{
		this.logger.log(`create`);
		return await this.inventories.create(rollId, ownerId, quantity);
	}

	@ApiOkResponse({type: InventoryEntity, isArray: true})
	@Get("owner/:id")
	async findAllWithCharacter(@Param("id") ownerId: string): Promise<Array<InventoryEntity>>{
		this.logger.log(`findAllWithCharacter => ${ownerId}`);
		return await this.inventories.findAllWithCharacter(ownerId);
	}

	@ApiOkResponse({type: InventoryEntity})
	@Get(":id")
	async findOne(@Param("id") id: string): Promise<InventoryEntity>{
		this.logger.log(`findOne => ${id}`);
		return await this.inventories.findOne(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: InventoryEntity})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id/:qty")
	async update(@Param("id") id: string, @Param("qty") quantity: number): Promise<InventoryEntity>{
		this.logger.log(`update => ${id}`);
		return await this.inventories.update(id, quantity);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	async delete(@Param("id") id: string){
		this.logger.log(`delete => ${id}`);
		return await this.inventories.delete(id);
	}
}
