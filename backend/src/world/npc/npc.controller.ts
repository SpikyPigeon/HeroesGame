import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {SquareEntity} from "../square.entity";
import {ShopEntity} from "../shop";
import {NpcService} from "./npc.service";
import {NpcEntity} from "./npc.entity";

interface CreateNpcInfo {
	square: SquareEntity,
	name: string,
	description: string,
	shop: ShopEntity,
}

@Controller()
export class NpcController {
	constructor(private readonly npcs: NpcService) {
	}

	@Post()
	async create(@Body() data: CreateNpcInfo): Promise<NpcEntity> {
		return await this.npcs.create(data.square.worldId, data.square.x, data.square.y, data.name, data.description);
	}

	@Get()
	async findAll(): Promise<NpcEntity[]> {
		return await this.npcs.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: number): Promise<NpcEntity> {
		return await this.npcs.findOne(id);
	}

	@Put(":id")
	async update(@Param("id") id: number, @Body() data: Partial<NpcEntity>): Promise<NpcEntity> {
		return await this.npcs.update(id, data);
	}

}
