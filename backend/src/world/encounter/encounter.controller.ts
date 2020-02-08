import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateDropInfo, EncounterInfo, UpdateDropInfo} from "./encounter.dto";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterService} from "./encounter.service";
import {EncounterEntity} from "./encounter.entity";

@ApiTags("world")
@Controller("encounter")
export class EncounterController {
	private readonly logger: Logger = new Logger(EncounterController.name);

	constructor(
		private readonly encounters: EncounterService
	) {
	}

	@ApiOkResponse({type: EncounterDropEntity, isArray: true})
	@Get("drop")
	async findAllDrops(): Promise<EncounterDropEntity[]> {
		this.logger.log(`findAllDrops`);
		return await this.encounters.findAllDrops();
	}

	@ApiOkResponse({type: EncounterDropEntity})
	@Get("drop/:id")
	async findOneDrop(@Param() id: number): Promise<EncounterDropEntity> {
		this.logger.log(`findOneDrop => ${id}`);
		return await this.encounters.findOneDrop(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: EncounterDropEntity})
	@ApiBody({type: CreateDropInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post("drop")
	async createDrop(@Body() data: CreateDropInfo): Promise<EncounterDropEntity> {
		this.logger.log(`createDrop`);
		return await this.encounters.createDrop(data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: EncounterDropEntity})
	@ApiBody({type: UpdateDropInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put("drop/:id")
	async updateDrop(@Param() id: number, @Body() data: Partial<UpdateDropInfo>): Promise<EncounterDropEntity> {
		this.logger.log(`updateDrop => ${id}`);
		return await this.encounters.updateDrop(id, data);
	}

	@ApiOkResponse({type: EncounterEntity, isArray: true})
	@Get()
	async findAllEncounters(): Promise<EncounterEntity[]> {
		this.logger.log(`findAllEncounters`);
		return await this.encounters.findAllEncounters();
	}

	@ApiOkResponse({type: EncounterEntity, isArray: true})
	@Get(":worldId/:x/:y")
	async findAllAtLocation(
		@Param("worldId") worldId: number,
		@Param("x") x: number,
		@Param("y") y: number,
	): Promise<Array<EncounterEntity>> {
		this.logger.log(`findAllAtLocation => ${worldId}@${x}.${y}`);
		return await this.encounters.findAllAtLocation(worldId, x, y);
	}

	@ApiOkResponse({type: EncounterEntity})
	@Get(":id")
	async findOneEncounter(@Param() id: number): Promise<EncounterEntity> {
		this.logger.log(`findOneEncounter => ${id}`);
		return this.encounters.findOneEncounter(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: EncounterEntity})
	@ApiBody({type: EncounterInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createEncounter(@Body() data: EncounterInfo): Promise<EncounterEntity> {
		this.logger.log(`createEncounter`);
		return await this.encounters.createEncounter(data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: EncounterEntity})
	@ApiBody({type: EncounterInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateEncounter(@Param() id: number, @Body() data: Partial<EncounterInfo>): Promise<EncounterEntity> {
		this.logger.log(`updateEncounter => ${id}`);
		return await this.encounters.updateEncounter(id, data);
	}
}
