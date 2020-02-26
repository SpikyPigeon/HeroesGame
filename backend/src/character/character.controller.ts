import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CharacterInfoDto, MoveCharacterInfoDto, UpdateCharacterInfoDto, UpdateEquipmentDto} from "./character.dto";
import {CharacterService} from "./character.service";
import {CharacterEntity} from "./character.entity";
import {AvatarService} from "./avatar.service";
import {AvatarEntity} from "./avatar.entity";
import {UserEntity} from "../user";

@ApiTags("user")
@Controller()
export class CharacterController {
	private readonly logger: Logger = new Logger(CharacterController.name);

	constructor(private readonly characters: CharacterService, private readonly avatars: AvatarService) {
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: UpdateEquipmentDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("equipment")
	async updateMyEquipment(@Request() req: any, @Body() data: Partial<UpdateEquipmentDto>): Promise<CharacterEntity> {
		this.logger.log(`updateMyEquipment`);
		return await this.characters.updateMyEquipment((req.user as UserEntity).id, data);
	}

	@ApiOkResponse({type: AvatarEntity, isArray: true})
	@Get("avatar")
	async findAllAvatars(): Promise<Array<AvatarEntity>> {
		this.logger.log(`findAllAvatars`);
		return await this.avatars.findAll();
	}

	@ApiOkResponse({type: AvatarEntity})
	@Get("avatar/:id")
	async findOneAvatar(@Param("id") id: number): Promise<AvatarEntity> {
		this.logger.log(`findOneAvatar => ${id}`);
		return await this.avatars.findOne(id);
	}

	@ApiOkResponse({type: CharacterEntity, isArray: true})
	@Get(":worldId/:x/:y")
	async findAllAtLocation(
		@Param("worldId") worldId: number,
		@Param("x") x: number,
		@Param("y") y: number,
	) {
		this.logger.log(`findAllAtLocation => ${worldId}@${x}.${y}`);
		return await this.characters.findAllAtLocation(worldId, x, y);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	async findMine(@Request() req: any): Promise<CharacterEntity> {
		this.logger.log(`findMine`);
		return await this.characters.findMine((req.user as UserEntity).id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: UpdateCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("me")
	async updateMine(@Request() req: any, @Body() data: Partial<UpdateCharacterInfoDto>): Promise<CharacterEntity> {
		this.logger.log(`updateMine`);
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.characters.update(id, data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: MoveCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("me/move")
	async moveMineTo(@Request() req: any, @Body() data: MoveCharacterInfoDto): Promise<CharacterEntity> {
		this.logger.log(`moveMineTo`);
		const {id} = await this.characters.findMine((req.user as UserEntity).id);
		return await this.characters.moveTo(id, data.worldId, data.x, data.y);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: CharacterEntity})
	@ApiBody({type: CharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async create(@Request() req: any, @Body() data: CharacterInfoDto): Promise<CharacterEntity> {
		this.logger.log(`create`);
		return await this.characters.create(req.user as UserEntity, data.name, data.avatarId);
	}

	@ApiOkResponse({type: CharacterEntity, isArray: true})
	@Get()
	async findAll(): Promise<CharacterEntity[]> {
		this.logger.log(`findAll`);
		return await this.characters.findAll();
	}

	@ApiOkResponse({type: CharacterEntity})
	@Get(":id")
	async findOne(@Param() id: string): Promise<CharacterEntity> {
		this.logger.log(`findOne => ${id}`);
		return await this.characters.findOne(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: UpdateCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async update(@Param() id: string, @Body() data: Partial<UpdateCharacterInfoDto>): Promise<CharacterEntity> {
		this.logger.log(`update => ${id}`);
		return await this.characters.update(id, data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: CharacterEntity})
	@ApiBody({type: MoveCharacterInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id/move")
	async moveTo(@Param("id") id: string, @Body() data: MoveCharacterInfoDto): Promise<CharacterEntity> {
		this.logger.log(`moveTo => ${id}`);
		return await this.characters.moveTo(id, data.worldId, data.x, data.y);
	}
}
