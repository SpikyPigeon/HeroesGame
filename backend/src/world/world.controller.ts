import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateWorldInfo, UpdateWorldInfo} from "./world.dto";
import {WorldService} from "./world.service";
import {WorldEntity} from "./world.entity";

@ApiTags("world")
@Controller()
export class WorldController {
	constructor(private readonly worlds: WorldService) {
	}

	@ApiOkResponse({type: WorldEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<WorldEntity>> {
		return await this.worlds.findAll();
	}

	@ApiOkResponse({type: WorldEntity})
	@Get(":id")
	async findOne(@Param("id") id: number): Promise<WorldEntity> {
		return await this.worlds.findOne(id);
	}

	@ApiCreatedResponse({type: WorldEntity})
	@ApiBody({type: CreateWorldInfo})
	@Post()
	async create(@Body() data: CreateWorldInfo): Promise<WorldEntity> {
		return await this.worlds.create(data.name, data.limitX, data.limitY, data.color, data.bgImage);
	}

	@ApiOkResponse({type: WorldEntity})
	@ApiBody({type: UpdateWorldInfo})
	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<UpdateWorldInfo>): Promise<WorldEntity> {
		return await this.worlds.update(id, data.name, data.bgImage, data.color);
	}
}
