import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Logger, Param, Post, UseGuards} from "@nestjs/common";
import {RollService} from "./roll.service";
import {RollEntity} from "./roll.entity";
import {AuthGuard} from "@nestjs/passport";

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
}
