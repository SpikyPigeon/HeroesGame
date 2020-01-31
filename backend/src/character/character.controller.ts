import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {Body, Controller, Get, Request, Post, Param, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CharacterInfoDto, MoveCharacterInfoDto, UpdateCharacterInfoDto} from "./character.dto";
import {CharacterService} from "./character.service";
import {CharacterEntity} from "./character.entity";
import {AvatarService} from "./avatar.service";
import {UserEntity} from "../user";

@Controller()
export class CharacterController {
	constructor(private readonly characters: CharacterService, private readonly avatars: AvatarService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: CharacterEntity})
	@ApiBody({type: CharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Request() req: any, @Body() data: CharacterInfoDto): Promise<CharacterEntity> {
		return await this.characters.create(req.user as UserEntity, data.name, data.avatarId);
	}

	@ApiOkResponse({type: CharacterEntity, isArray: true})
	@Get()
	async findAll(): Promise<CharacterEntity[]> {
		return await this.characters.findAll();
	}

	@ApiOkResponse({type: CharacterEntity})
	@Get(":id")
	async findOne(@Param() id: string): Promise<CharacterEntity> {
		return await this.characters.findOne(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: UpdateCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async update(@Param() id: string, @Body() data: Partial<UpdateCharacterInfoDto>): Promise<CharacterEntity> {
		return await this.characters.update(id, data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: MoveCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("move")
	async moveTo(@Body() data: MoveCharacterInfoDto): Promise<CharacterEntity> {
		return await this.characters.moveTo(data.characterId, data.worldId, data.x, data.y);
	}
}
