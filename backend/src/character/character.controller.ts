import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CharacterInfoDto, MoveCharacterInfoDto, UpdateCharacterInfoDto} from "./character.dto";
import {CharacterService} from "./character.service";
import {CharacterEntity} from "./character.entity";
import {AvatarService} from "./avatar.service";
import {AvatarEntity} from "./avatar.entity";
import {UserEntity} from "../user";

@ApiTags("user")
@Controller()
export class CharacterController {
	constructor(private readonly characters: CharacterService, private readonly avatars: AvatarService) {
	}

	@ApiOkResponse({type: AvatarEntity, isArray: true})
	@Get("avatar")
	async findAllAvatars(): Promise<Array<AvatarEntity>> {
		return await this.avatars.findAll();
	}

	@ApiOkResponse({type: AvatarEntity})
	@Get("avatar/:id")
	async findOneAvatar(@Param("id") id: number): Promise<AvatarEntity> {
		return await this.avatars.findOne(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	async findMine(@Request() req: any): Promise<CharacterEntity> {
		return await this.characters.findMine((req.user as UserEntity).id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: UpdateCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("me")
	async updateMine(@Request() req: any, @Body() data: Partial<UpdateCharacterInfoDto>): Promise<CharacterEntity> {
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.characters.update(id, data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: MoveCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("me/move")
	async moveMineTo(@Request() req: any, @Body() data: MoveCharacterInfoDto): Promise<CharacterEntity> {
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.characters.moveTo(id, data.worldId, data.x, data.y);
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
	@Put(":id/move")
	async moveTo(@Param("id") charId: string, @Body() data: MoveCharacterInfoDto): Promise<CharacterEntity> {
		return await this.characters.moveTo(charId, data.worldId, data.x, data.y);
	}
}
