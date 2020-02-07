import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateDropInfo, EncounterInfo, UpdateDropInfo} from "./encounter.dto";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterService} from "./encounter.service";
import {EncounterEntity} from "./encounter.entity";

@ApiTags("world")
@Controller("encounter")
export class EncounterController {
	constructor(
		private readonly encounters: EncounterService
	) {
	}

	@ApiOkResponse({type: EncounterDropEntity, isArray: true})
	@Get("drop")
	async findAllDrops(): Promise<EncounterDropEntity[]> {
		return await this.encounters.findAllDrops();
	}

	@ApiOkResponse({type: EncounterDropEntity})
	@Get("drop/:id")
	async findOneDrop(@Param() id: number): Promise<EncounterDropEntity> {
		return await this.encounters.findOneDrop(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: EncounterDropEntity})
	@ApiBody({type: CreateDropInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post("drop")
	async createDrop(@Body() data: CreateDropInfo): Promise<EncounterDropEntity> {
		return await this.encounters.createDrop(data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: EncounterDropEntity})
	@ApiBody({type: UpdateDropInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put("drop/:id")
	async updateDrop(@Param() id: number, @Body() data: Partial<UpdateDropInfo>): Promise<EncounterDropEntity> {
		return await this.encounters.updateDrop(id, data);
	}

	@ApiOkResponse({type: EncounterEntity, isArray: true})
	@Get()
	async findAllEncounters(): Promise<EncounterEntity[]> {
		return await this.encounters.findAllEncounters();
	}

	@ApiOkResponse({type: EncounterEntity})
	@Get(":id")
	async findOneEncounter(@Param() id: number): Promise<EncounterEntity> {
		return this.encounters.findOneEncounter(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: EncounterEntity})
	@ApiBody({type: EncounterInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createEncounter(@Body() data: EncounterInfo): Promise<EncounterEntity> {
		return await this.encounters.createEncounter(data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: EncounterEntity})
	@ApiBody({type: EncounterInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateEncounter(@Param() id: number, @Body() data: Partial<EncounterInfo>): Promise<EncounterEntity> {
		return await this.encounters.updateEncounter(id, data);
	}
}
