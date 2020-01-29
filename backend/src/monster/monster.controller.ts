import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {MonsterInfo, MonsterService, TypeInfo} from "./monster.service";
import {MonsterEntity} from "./monster.entity";
import {MonsterTypeEntity} from "./monster-type.entity";

@Controller()
export class MonsterController {
	constructor(private readonly monsters: MonsterService) {
	}

	@Get("type")
	async findAllTypes(): Promise<MonsterTypeEntity[]> {
		return await this.monsters.findAllTypes();
	}

	@Get("type/:id")
	async findOneType(@Param("id") id: number): Promise<MonsterTypeEntity> {
		return await this.monsters.findOneType(id);
	}

	@Post("type")
	async createType(@Body() data: TypeInfo): Promise<MonsterTypeEntity> {
		return await this.monsters.createType(data.name, data.description);
	}

	@Put("type/:id")
	async updateType(@Param("id") id: number, @Body() data: Partial<TypeInfo>): Promise<MonsterTypeEntity> {
		return await this.monsters.updateType(id, data);
	}

	@Get()
	async findAllMonsters(): Promise<MonsterEntity[]> {
		return await this.monsters.findAllMonsters();
	}

	@Get(":id")
	async findOneMonster(@Param("id") id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneMonster(id);
	}

	@Post()
	async createMonster(@Body() data: MonsterInfo): Promise<MonsterEntity> {
		return await this.monsters.createMonster(data);
	}

	@Put(":id")
	async updateMonster(@Param("id") id: number, @Body() data: Partial<MonsterInfo>): Promise<MonsterEntity> {
		return await this.monsters.updateMonster(id, data);
	}
}
