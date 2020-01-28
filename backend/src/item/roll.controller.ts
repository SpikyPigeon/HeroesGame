import {Controller, Get, Param, Post} from "@nestjs/common";
import {RollService} from "./roll.service";
import {RollEntity} from "./roll.entity";

@Controller("/roll")
export class RollController {
	constructor(private readonly rolls: RollService) {
	}

	@Get()
	async getAll(): Promise<Array<RollEntity>> {
		return await this.rolls.findAll();
	}

	@Get(":id")
	async getOne(@Param("id") id: string): Promise<RollEntity> {
		return await this.rolls.findOne(id);
	}

	@Post(":item")
	async create(@Param("item") item: number): Promise<RollEntity> {
		return await this.rolls.create(item);
	}
}
