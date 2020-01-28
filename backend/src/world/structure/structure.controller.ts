import {Body, Controller, Param, Get, Post, Put} from "@nestjs/common";
import {StructureService, UpdateStructureInfo} from "./structure.service";
import {StructureEntity} from "./structure.entity";
import {SquareService} from "../square.service";
import {StructureType} from "heroes-common";
import {ShopEntity} from "../shop";
import {SquareEntity} from "../square.entity";

interface CreateStructureInfo{
	square: SquareEntity,
	name: string,
	description: string,
	type: StructureType,
	shop: ShopEntity,
}

@Controller()
export class StructureController {
	constructor(private readonly structures: StructureService) {
	}

	@Post()
	async create(@Body() data: CreateStructureInfo): Promise<StructureEntity>{
		return await this.structures.create(data.square.worldId, data.square.x, data.square.y, data.name, data.description, data.type);
	}

	@Get()
	async findAll(): Promise<StructureEntity[]>{
		return await this.structures.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id:number): Promise<StructureEntity>{
		return await this.structures.findOne(id);
	}

	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<UpdateStructureInfo>): Promise<StructureEntity>{
		return await this.structures.update(id, data);
	}

}
