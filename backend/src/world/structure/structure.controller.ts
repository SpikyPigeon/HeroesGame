import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {StructureService} from "./structure.service";
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

	@ApiBearerAuth()
	@ApiCreatedResponse({type: StructureEntity})
	@ApiBody({type: CreateStructureInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Body() data: CreateStructureInfo): Promise<StructureEntity> {
		return await this.structures.create(data.worldId, data.x, data.y, data.name, data.description, data.type);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: StructureEntity})
	@ApiBody({type: CreateStructureInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<CreateStructureInfo>): Promise<StructureEntity> {
		return await this.structures.update(id, data);
	}
}
