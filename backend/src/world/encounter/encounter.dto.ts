import {ApiProperty} from "@nestjs/swagger";

export class EncounterInfo {
	@ApiProperty()
	worldId: number = 0;

	@ApiProperty()
	x: number = 0;

	@ApiProperty()
	y: number = 0;

	@ApiProperty()
	monsterId: number = 0;

	@ApiProperty()
	spawnChance: number = 0;

	@ApiProperty()
	minGold: number = 0;

	@ApiProperty()
	maxGold: number = 0;
}

export class EncounterDropInfo {
	@ApiProperty()
	itemId: number = 0;

	@ApiProperty()
	encounterId: number = 0;

	@ApiProperty()
	dropChance: number = 0;

	@ApiProperty()
	minQuantity: number = 0;

	@ApiProperty()
	maxQuantity: number = 0;
}
