import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateWorldInfo, UpdateWorldInfo} from "./world.dto";
import {WorldService} from "./world.service";
import {WorldEntity} from "./world.entity";

@ApiTags("world")
@Controller()
export class WorldController {
	private readonly logger: Logger = new Logger(WorldController.name);

	constructor(private readonly worlds: WorldService) {
	}

	@ApiOkResponse({type: WorldEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<WorldEntity>> {
		this.logger.log(`findAll`);
		return await this.worlds.findAll();
	}

	@ApiOkResponse({type: WorldEntity})
	@Get(":id")
	async findOne(@Param("id") id: number): Promise<WorldEntity> {
		this.logger.log(`findOne => ${id}`);
		return await this.worlds.findOne(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: WorldEntity})
	@ApiBody({type: CreateWorldInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Body() data: CreateWorldInfo): Promise<WorldEntity> {
		this.logger.log(`create`);
		return await this.worlds.create(data.name, data.limitX, data.limitY, data.color, data.bgImage);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: WorldEntity})
	@ApiBody({type: UpdateWorldInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<UpdateWorldInfo>): Promise<WorldEntity> {
		this.logger.log(`update => ${id}`);
		return await this.worlds.update(id, data.name, data.bgImage, data.color);
	}
}
