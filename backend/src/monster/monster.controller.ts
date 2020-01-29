import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {MonsterInfo, MonsterTypeInfo} from "./monster.dto";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterService} from "./monster.service";
import {MonsterEntity} from "./monster.entity";

@ApiTags("monster")
@Controller()
export class MonsterController {
	constructor(private readonly monsters: MonsterService) {
	}

	@ApiOkResponse({type: MonsterTypeEntity, isArray: true})
	@Get("type")
	async findAllTypes(): Promise<Array<MonsterTypeEntity>> {
		return await this.monsters.findAllTypes();
	}

	@ApiOkResponse({type: MonsterTypeEntity})
	@Get("type/:id")
	async findOneType(@Param("id") id: number): Promise<MonsterTypeEntity> {
		return await this.monsters.findOneType(id);
	}

	@ApiCreatedResponse({type: MonsterTypeEntity})
	@ApiBody({type: MonsterTypeInfo})
	@Post("type")
	async createType(@Body() data: MonsterTypeInfo): Promise<MonsterTypeEntity> {
		return await this.monsters.createType(data.name, data.description);
	}

	@ApiOkResponse({type: MonsterTypeEntity})
	@ApiBody({type: MonsterTypeInfo})
	@Put("type/:id")
	async updateType(@Param("id") id: number, @Body() data: Partial<MonsterTypeInfo>): Promise<MonsterTypeEntity> {
		return await this.monsters.updateType(id, data);
	}

	@ApiOkResponse({type: MonsterEntity, isArray: true})
	@Get()
	async findAllMonsters(): Promise<MonsterEntity[]> {
		return await this.monsters.findAllMonsters();
	}

	@ApiOkResponse({type: MonsterEntity})
	@Get(":id")
	async findOneMonster(@Param("id") id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneMonster(id);
	}

	@ApiCreatedResponse({type: MonsterEntity})
	@ApiBody({type: MonsterInfo})
	@Post()
	async createMonster(@Body() data: MonsterInfo): Promise<MonsterEntity> {
		return await this.monsters.createMonster(data);
	}

	@ApiOkResponse({type: MonsterEntity})
	@ApiBody({type: MonsterInfo})
	@Put(":id")
	async updateMonster(@Param("id") id: number, @Body() data: Partial<MonsterInfo>): Promise<MonsterEntity> {
		return await this.monsters.updateMonster(id, data);
	}
}
