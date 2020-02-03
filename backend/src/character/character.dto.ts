import {ApiProperty} from "@nestjs/swagger";
import {CharacterInfo, MoveCharacterInfo, UpdateCharacterInfo} from "heroes-common";

export class CharacterInfoDto implements CharacterInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	avatarId: number = 0;
}

export class MoveCharacterInfoDto implements MoveCharacterInfo {
	@ApiProperty()
	characterId: string = "";

	@ApiProperty()
	worldId: number = 0;

	@ApiProperty()
	x: number = 0;

	@ApiProperty()
	y: number = 0;
}

export class UpdateCharacterInfoDto implements UpdateCharacterInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	avatarId: number = 0;

	@ApiProperty()
	experience: number = 0;

	@ApiProperty()
	level: number = 1;

	@ApiProperty()
	strength: number = 1;

	@ApiProperty()
	dexterity: number = 1;

	@ApiProperty()
	vitality: number = 1;

	@ApiProperty()
	intellect: number = 1;

	@ApiProperty()
	currentHealth: number = 0;

	@ApiProperty()
	currentMana: number = 0;

	@ApiProperty()
	currentEnergy: number = 0;

	@ApiProperty()
	gold: number = 0;

	@ApiProperty()
	gem: number = 0;

	@ApiProperty()
	isActive: boolean = true;
}
