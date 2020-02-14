import {Body, Controller, Get, Logger, Param, Put} from "@nestjs/common";
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ModuleRef} from "@nestjs/core";
import {SquareContentDto, UpdateSquareImageInfo} from "./world.dto";
import {SquareService} from "./square.service";
import {SquareEntity} from "./square.entity";
import {EncounterService} from "./encounter";
import {StructureService} from "./structure";
import {CharacterService} from "../character";
import {NpcService} from "./npc";

@ApiTags("world")
@Controller("/square")
export class SquareController {
	private readonly logger: Logger = new Logger(SquareController.name);

	constructor(
		private readonly squares: SquareService,
		private readonly refs: ModuleRef,
	) {
	}

	@ApiOkResponse({type: SquareEntity, isArray: true})
	@Get(":worldId")
	async findAll(@Param("worldId") worldId: number): Promise<Array<SquareEntity>> {
		this.logger.log(`findAll => ${worldId}`);
		return await this.squares.findAll(worldId);
	}

	@ApiOkResponse({type: SquareEntity})
	@Get(":worldId/:x/:y")
	async findOne(
		@Param("worldId") worldId: number,
		@Param("x") x: number,
		@Param("y") y: number,
	): Promise<SquareEntity> {
		this.logger.log(`findOne => ${worldId}@${x}.${y}`);
		return await this.squares.findOne(worldId, x, y);
	}

	@ApiOkResponse({type: SquareContentDto})
	@Get(":worldId/:x/:y/content")
	async findOneContent(
		@Param("worldId") worldId: number,
		@Param("x") x: number,
		@Param("y") y: number,
	): Promise<SquareContentDto> {
		this.logger.log(`findOneContent => ${worldId}@${x}.${y}`);

		const encounters = this.refs.get(EncounterService, {strict: false});
		const structures = this.refs.get(StructureService, {strict: false});
		const characters = this.refs.get(CharacterService, {strict: false});
		const npcs = this.refs.get(NpcService, {strict: false});

		return {
			encounters: await encounters.findAllAtLocation(worldId, x, y),
			structures: await structures.findAllAtLocation(worldId, x, y),
			players: await characters.findAllAtLocation(worldId, x, y),
			npcs: await npcs.findAllAtLocation(worldId, x, y),
		};
	}

	@ApiOkResponse({type: SquareEntity})
	@ApiBody({type: UpdateSquareImageInfo})
	@Put(":worldId/:x/:y")
	async setImage(
		@Param("worldId") worldId: number,
		@Param("x") x: number,
		@Param("y") y: number,
		@Body() newImage: UpdateSquareImageInfo,
	): Promise<SquareEntity> {
		this.logger.log(`setImage => ${worldId}@${x}.${y}`);
		return await this.squares.setImage(worldId, x, y, newImage);
	}
}
