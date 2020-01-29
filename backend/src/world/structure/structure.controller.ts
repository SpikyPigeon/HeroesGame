import {ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {StructureService, UpdateStructureInfo} from "./structure.service";
import {CreateStructureInfo} from "./structure.dto";
import {StructureEntity} from "./structure.entity";

@ApiTags("world")
@Controller()
export class StructureController {
	constructor(private readonly structures: StructureService) {
	}

	@ApiOkResponse({type: StructureEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<StructureEntity>> {
		return await this.structures.findAll();
	}

	@ApiOkResponse({type: StructureEntity})
	@Get(":id")
	async findOne(@Param("id") id: number): Promise<StructureEntity> {
		return await this.structures.findOne(id);
	}

	@ApiCreatedResponse({type: StructureEntity})
	@ApiBody({type: CreateStructureInfo})
	@Post()
	async create(@Body() data: CreateStructureInfo): Promise<StructureEntity> {
		return await this.structures.create(data.worldId, data.x, data.y, data.name, data.description, data.type);
	}

	@ApiOkResponse({type: StructureEntity})
	@ApiBody({type: CreateStructureInfo})
	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<UpdateStructureInfo>): Promise<StructureEntity> {
		return await this.structures.update(id, data);
	}
}
