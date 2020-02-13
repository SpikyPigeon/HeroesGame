import {Controller, Get, Logger, Param, Post, Request, UseGuards} from "@nestjs/common";
import {SlapService} from "./slap.service";
import {CharacterService} from "../character.service";
import {ApiBearerAuth, ApiBody, ApiOkResponse} from "@nestjs/swagger";
import {SlapEntity} from "./slap.entity";
import {AuthGuard} from "@nestjs/passport";
import {UserEntity} from "../../user";
import {CharacterEntity} from "../character.entity";

@Controller()
export class SlapController {
	private readonly logger: Logger = new Logger(SlapController.name);
	constructor(private readonly slaps: SlapService, private readonly characters: CharacterService) {
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: SlapEntity})
	@UseGuards(AuthGuard("jmt"))
	@Post(":slapped")
	async create(@Request() req: any, @Param("slapped") slappedId: string): Promise<SlapEntity>{
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.slaps.create(id, slappedId);
	}

	@ApiOkResponse({type: SlapEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<SlapEntity>>{
		return await this.slaps.findAll();
	}

	@ApiOkResponse({type: SlapEntity, isArray: true})
	//@ApiBody({type: CharacterEntity})
	@Get(":id")
	async findAllWithCharacter(@Param("id") id: string): Promise<Array<SlapEntity>>{
		return await this.slaps.findAllWithCharacter(id);
	}

	//@ApiOkResponse({type: number})
	@Get("count")
	async countAll(): Promise<number>{
		return await this.slaps.countAll();
	}

	@Get("count/slapped/:id")
	async countSlapped(@Param("id") id: string): Promise<number>{
		return await this.slaps.countSlapped(id);
	}

	@Get("count/slapper/:id")
	async countSlapper(@Param("id") id: string): Promise<number>{
		return await this.slaps.countSlapper(id);
	}

	@ApiBearerAuth()
	//@ApiOkResponse({type: boolean})
	@UseGuards(AuthGuard("jmt"))
	@Get("slappable/:slappedId")
	async checkSlappable(@Request() req: any, @Param("slappedId") slappedId: string): Promise<boolean>{
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.slaps.checkSlappable(id, slappedId);
	}

}
