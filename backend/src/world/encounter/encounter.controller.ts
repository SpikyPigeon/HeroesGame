import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {EncounterDropInfo, EncounterInfo, EncounterService} from "./encounter.service";
import {EncounterEntity} from "./encounter.entity";
import {EncounterDropEntity} from "./encounter-drop.entity";

@Controller()
export class EncounterController {
	constructor(
		private readonly encounters: EncounterService
	) {
	}

	@Post()
	async createEncounter(@Body() data: EncounterInfo): Promise<EncounterEntity>{
		return await this.encounters.createEncounter(data);
	}

	@Post("drop")
	async createDrop(@Body() data: EncounterDropInfo): Promise<EncounterDropEntity>{
		return await this.encounters.createDrop(data);
	}

	@Get()
	async findAllEncounters(): Promise<EncounterEntity[]>{
		return await this.encounters.findAllEncounters();
	}

	@Get("drop")
	async findAllDrops(): Promise<EncounterDropEntity[]>{
		return await this.encounters.findAllDrops();
	}

	@Get(":id")
	async findOneEncounter(@Param() id: number): Promise<EncounterEntity>{
		return this.encounters.findOneEncounter(id);
	}

	@Get("drop/:id")
	async findOneDrop(@Param() id: number): Promise<EncounterDropEntity>{
		return await this.encounters.findOneDrop(id);
	}

	@Put(":id")
	async updateEncounter(@Param() id: number, @Body() data: Partial<EncounterInfo>): Promise<EncounterEntity>{
		return await this.encounters.updateEncounter(id, data);
	}

	@Put("drop/:id")
	async updateDrop(@Param() id: number, @Body() data: Partial<EncounterDropInfo>): Promise<EncounterDropEntity>{
		return await this.encounters.updateDrop(id, data);
	}
}
