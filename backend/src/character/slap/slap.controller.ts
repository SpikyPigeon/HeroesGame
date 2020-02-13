import {Controller, Get, Logger, Param, Post, Request, UseGuards} from "@nestjs/common";
import {SlapService} from "./slap.service";
import {CharacterService} from "../character.service";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags} from "@nestjs/swagger";
import {SlapEntity} from "./slap.entity";
import {AuthGuard} from "@nestjs/passport";
import {UserEntity} from "../../user";

export class SlappableDto {
	@ApiProperty()
	slappable: boolean = false;
}

export class SlapCountDto {
	@ApiProperty()
	count: number = 0;
}

@ApiTags("user")
@Controller()
export class SlapController {
	private readonly logger: Logger = new Logger(SlapController.name);

	constructor(private readonly slaps: SlapService, private readonly characters: CharacterService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: SlapEntity})
	@UseGuards(AuthGuard("jmt"))
	@Post(":slapped")
	async create(@Request() req: any, @Param("slapped") slappedId: string): Promise<SlapEntity> {
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.slaps.create(id, slappedId);
	}

	@ApiOkResponse({type: SlapEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<SlapEntity>> {
		return await this.slaps.findAll();
	}

	@ApiOkResponse({type: SlapEntity, isArray: true})
	@Get(":id")
	async findAllWithCharacter(@Param("id") id: string): Promise<Array<SlapEntity>> {
		return await this.slaps.findAllWithCharacter(id);
	}

	@ApiOkResponse({type: SlapCountDto})
	@Get("count")
	async countAll(): Promise<SlapCountDto> {
		return {
			count: await this.slaps.countAll()
		};
	}

	@ApiOkResponse({type: SlapCountDto})
	@Get("count/slapped/:id")
	async countSlapped(@Param("id") id: string): Promise<SlapCountDto> {
		return {count: await this.slaps.countSlapped(id)};
	}

	@ApiOkResponse({type: SlapCountDto})
	@Get("count/slapper/:id")
	async countSlapper(@Param("id") id: string): Promise<SlapCountDto> {
		return {count: await this.slaps.countSlapper(id)};
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: SlappableDto})
	@UseGuards(AuthGuard("jmt"))
	@Get("slappable/:slappedId")
	async checkSlappable(@Request() req: any, @Param("slappedId") slappedId: string): Promise<SlappableDto> {
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return {slappable: await this.slaps.checkSlappable(id, slappedId)};
	}
}
