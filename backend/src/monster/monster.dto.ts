import {ApiProperty} from "@nestjs/swagger";

export class MonsterInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	description: string = "";

	@ApiProperty()
	typeId: number = 0;

	@ApiProperty()
	level: number = 0;

	@ApiProperty()
	strength: number = 0;

	@ApiProperty()
	dexterity: number = 0;

	@ApiProperty()
	vitality: number = 0;

	@ApiProperty()
	intellect: number = 0;

	@ApiProperty()
	picture: string = "";
}

export class MonsterTypeInfo {
	@ApiProperty()
	name: string = "";

	@ApiProperty()
	description: string = "";
}
