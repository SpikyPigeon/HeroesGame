import {Body, Controller, Get, Logger, Param, Post, Put} from "@nestjs/common";
import {WorldService} from "./world.service";
import {WorldEntity} from "./world.entity";
import {World} from "heroes-common/src";

interface CreateWorldInfo{
	name: string;
	limitX: number;
	limitY: number;
	color: string;
	bgImage: string;
}

interface UpdateWorldInfo{
	name: string;
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

	@Put(":id")
	async update(@Param("id") id:number, @Body() data: Partial<UpdateWorldInfo>): Promise<WorldEntity>{
		return await this.worlds.update(id, data.name, data.bgImage, data.color);
	}

	@Get()
	async getAll(): Promise<WorldEntity[]>{
		return await this.worlds.findAll();
	}

	@Get(":id")
	async getOne(@Param("id") id:number): Promise<WorldEntity>{
		return await this.worlds.findOne(id);
	}
}
