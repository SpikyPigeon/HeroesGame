import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {MonsterInfoDto, MonsterTypeInfoDto} from "./monster.dto";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterService} from "./monster.service";
import {MonsterEntity} from "./monster.entity";

@ApiTags("monster")
@Controller()
export class MonsterController {
	private readonly logger: Logger = new Logger(MonsterController.name);

	constructor(private readonly monsters: MonsterService) {
	}

	@ApiOkResponse({type: MonsterTypeEntity, isArray: true})
	@Get("type")
	async findAllTypes(): Promise<Array<MonsterTypeEntity>> {
		this.logger.log(`findAllTypes`);
		return await this.monsters.findAllTypes();
	}

	@ApiOkResponse({type: MonsterTypeEntity})
	@Get("type/:id")
	async findOneType(@Param("id") id: number): Promise<MonsterTypeEntity> {
		this.logger.log(`findOneType => ${id}`);
		return await this.monsters.findOneType(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: MonsterTypeEntity})
	@ApiBody({type: MonsterTypeInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post("type")
	async createType(@Body() data: MonsterTypeInfoDto): Promise<MonsterTypeEntity> {
		this.logger.log(`createType`);
		return await this.monsters.createType(data.name, data.description);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: MonsterTypeEntity})
	@ApiBody({type: MonsterTypeInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("type/:id")
	async updateType(@Param("id") id: number, @Body() data: Partial<MonsterTypeInfoDto>): Promise<MonsterTypeEntity> {
		this.logger.log(`updateType => ${id}`);
		return await this.monsters.updateType(id, data);
	}

	@ApiOkResponse({type: MonsterEntity, isArray: true})
	@Get()
	async findAllMonsters(): Promise<MonsterEntity[]> {
		this.logger.log(`findAllMonsters`);
		return await this.monsters.findAllMonsters();
	}

	@ApiOkResponse({type: MonsterEntity})
	@Get(":id")
	async findOneMonster(@Param("id") id: number): Promise<MonsterEntity> {
		this.logger.log(`findOneMonster => ${id}`);
		return await this.monsters.findOneMonster(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: MonsterEntity})
	@ApiBody({type: MonsterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createMonster(@Body() data: MonsterInfoDto): Promise<MonsterEntity> {
		this.logger.log(`createMonster`);
		return await this.monsters.createMonster(data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: MonsterEntity})
	@ApiBody({type: MonsterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateMonster(@Param("id") id: number, @Body() data: Partial<MonsterInfoDto>): Promise<MonsterEntity> {
		this.logger.log(`updateMonster => ${id}`);
		return await this.monsters.updateMonster(id, data);
	}
}
