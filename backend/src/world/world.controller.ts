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
	constructor(private readonly worlds: WorldService) {
	}

	@Post()
	async create(@Body() data: CreateWorldInfo):Promise<WorldEntity>{
		return await this.worlds.create(data.name, data.limitX, data.limitY, data.color, data.bgImage);
	}
}
