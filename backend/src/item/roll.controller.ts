import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {RollService} from "./roll.service";
import {RollEntity} from "./roll.entity";
import {AuthGuard} from "@nestjs/passport";

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

	@ApiBearerAuth()
	@ApiOkResponse({type: RollEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	async getOne(@Param("id") id: string): Promise<RollEntity> {
		return await this.rolls.findOne(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: RollEntity})
	@UseGuards(AuthGuard("jwt"))
	@Post(":item")
	async create(@Param("item") item: number): Promise<RollEntity> {
		return await this.rolls.create(item);
	}
}
