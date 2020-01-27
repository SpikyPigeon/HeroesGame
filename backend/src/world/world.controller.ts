import {Body, Controller, Post} from "@nestjs/common";
import {WorldService} from "./world.service";
import {WorldEntity} from "./world.entity";

interface CreateWorldInfo{
	name: string;
	X: number;
	Y: number;
	color: string;
	bgImage: string;
}

@Controller()
export class WorldController {
	constructor(private readonly worlds: WorldService) {
	}

	@Post()
	async create(@Body() data: CreateWorldInfo):Promise<WorldEntity>{
		return await this.worlds.create(data.name, data.X, data.Y, data.color, data.bgImage);
	}
}
