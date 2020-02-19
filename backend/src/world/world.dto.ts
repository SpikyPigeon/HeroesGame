import {ApiProperty} from "@nestjs/swagger";
import {SquareContent} from "heroes-common";
import {CharacterEntity} from "../character";
import {EncounterEntity} from "./encounter";
import {StructureEntity} from "./structure";
import {NpcEntity} from "./npc";

export class CreateWorldInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	limitX: number = 0;

	@ApiProperty()
	limitY: number = 0;

	@ApiProperty()
	color: string = "";

	@ApiProperty()
	bgImage: string = "";
}

export class UpdateWorldInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	color: string = "";

	@ApiProperty()
	bgImage: string = "";
}

export class UpdateSquareImageInfo {
	@ApiProperty()
	filenameImage: string = "";

	@ApiProperty()
	filenameIcon: string = "";
}

export class SquareContentDto implements SquareContent {
	@ApiProperty({type: EncounterEntity, isArray: true})
	encounters: Array<EncounterEntity> = [];

	@ApiProperty({type: NpcEntity, isArray: true})
	npcs: Array<NpcEntity> = [];

	@ApiProperty({type: StructureEntity, isArray: true})
	structures: Array<StructureEntity> = [];

	@ApiProperty({type: CharacterEntity, isArray: true})
	players: Array<CharacterEntity> = [];
}
