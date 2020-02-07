import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {NpcService} from "./npc.service";
import {NpcEntity} from "./npc.entity";
import {NpcInfo} from "./npc.dto";
import {AuthGuard} from "@nestjs/passport";

@ApiTags("world")
@Controller("npc")
export class NpcController {
	constructor(private readonly npcs: NpcService) {
	}

	@ApiOkResponse({type: NpcEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<NpcEntity>> {
		return await this.npcs.findAll();
	}

	@ApiOkResponse({type: NpcEntity})
	@Get(":id")
	async findOne(@Param("id") id: number): Promise<NpcEntity> {
		return await this.npcs.findOne(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: NpcEntity})
	@ApiBody({type: NpcInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Body() data: NpcInfo): Promise<NpcEntity> {
		return await this.npcs.create(data.worldId, data.x, data.y, data.name, data.description);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: NpcEntity})
	@ApiBody({type: NpcInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<NpcEntity>): Promise<NpcEntity> {
		return await this.npcs.update(id, data);
	}
}
