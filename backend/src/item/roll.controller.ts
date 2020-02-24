import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Delete, Get, Logger, Param, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {RollService} from "./roll.service";
import {RollEntity} from "./roll.entity";

@ApiTags("item")
@Controller("/roll")
export class RollController {
	private readonly logger: Logger = new Logger(RollController.name);

	constructor(private readonly rolls: RollService) {
	}

	@ApiOkResponse({type: RollEntity, isArray: true})
	@Get()
	async getAll(): Promise<Array<RollEntity>> {
		this.logger.log(`getAll`);
		return await this.rolls.findAll();
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: RollEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get(":id")
	async getOne(@Param("id") id: string): Promise<RollEntity> {
		this.logger.log(`getOne => ${id}`);
		return await this.rolls.findOne(id);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: RollEntity})
	@UseGuards(AuthGuard("jwt"))
	@Post(":item")
	async create(@Param("item") item: number): Promise<RollEntity> {
		this.logger.log(`create => ${item}`);
		return await this.rolls.create(item);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: RollEntity})
	@UseGuards(AuthGuard("jwt"))
	@Delete(":id")
	async delete(@Param("id") id: string) {
		this.logger.log(`delete => ${id}`);
		await this.rolls.delete(id);
	}
}
