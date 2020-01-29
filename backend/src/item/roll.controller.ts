import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Post} from "@nestjs/common";
import {RollService} from "./roll.service";
import {RollEntity} from "./roll.entity";

@ApiTags("item")
@Controller("/roll")
export class RollController {
	constructor(private readonly rolls: RollService) {
	}

	@ApiOkResponse({type: RollEntity, isArray: true})
	@Get()
	async getAll(): Promise<Array<RollEntity>> {
		return await this.rolls.findAll();
	}

	@ApiOkResponse({type: RollEntity})
	@Get(":id")
	async getOne(@Param("id") id: string): Promise<RollEntity> {
		return await this.rolls.findOne(id);
	}

	@ApiCreatedResponse({type: RollEntity})
	@Post(":item")
	async create(@Param("item") item: number): Promise<RollEntity> {
		return await this.rolls.create(item);
	}
}
