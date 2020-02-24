import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards, Request} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {InventoryService} from "./inventory.service";
import {InventoryEntity} from "./inventory.entity";
import {CreateInventoryDto} from "./inventory.dto";
import {UserEntity} from "../../user";

@ApiTags("user")
@Controller("inventory")
export class InventoryController {
	private readonly logger: Logger = new Logger(InventoryController.name);

	constructor(private readonly inventories: InventoryService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: InventoryEntity})
	@UseGuards(AuthGuard("jwt"))
	@ApiBody({type: CreateInventoryDto})
	@Post()
	async create(@Request() req: any, @Body() data: CreateInventoryDto): Promise<InventoryEntity> {
		this.logger.log(`create`);
		return await this.inventories.create((req.user as UserEntity).id, data.roll, data.quantity);
	}

	@ApiOkResponse({type: InventoryEntity, isArray: true})
	@Get("owner/:id")
	async findAllWithCharacter(@Param("id") ownerId: string): Promise<Array<InventoryEntity>> {
		this.logger.log(`findAllWithCharacter => ${ownerId}`);
		return await this.inventories.findAllWithCharacter(ownerId);
	}

	@ApiOkResponse({type: InventoryEntity})
	@Get(":id")
	async findOne(@Param("id") id: string): Promise<InventoryEntity> {
		this.logger.log(`findOne => ${id}`);
		return await this.inventories.findOne(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: InventoryEntity})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id/:qty")
	async update(@Param("id") id: string, @Param("qty") quantity: number): Promise<InventoryEntity> {
		this.logger.log(`update => ${id}`);
		return await this.inventories.update(id, quantity);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	async delete(@Param("id") id: string) {
		this.logger.log(`delete => ${id}`);
		return await this.inventories.delete(id);
	}
}
