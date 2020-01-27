import {Body, Controller, Logger, Post} from "@nestjs/common";
import {WorldService} from "./world.service";
import {WorldEntity} from "./world.entity";

interface CreateWorldInfo{
	name: string;
	limitX: number;
	limitY: number;
	color: string;
	bgImage: string;
}

@Controller()
export class WorldController {
	private readonly logger: Logger = new Logger(WorldController.name);

	constructor(private readonly worlds: WorldService) {
	}

	@Post()
	async create(@Body() data: CreateWorldInfo):Promise<WorldEntity>{
		this.logger.log("WorldController.create");
		return await this.worlds.create(data.name, data.limitX, data.limitY, data.color, data.bgImage);
	}
}
