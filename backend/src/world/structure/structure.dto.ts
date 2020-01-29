import {ApiProperty} from "@nestjs/swagger";
import {StructureType} from "heroes-common";

export class CreateStructureInfo {
	@ApiProperty()
	worldId: number = 0;

	@ApiProperty()
	x: number = 0;

	@ApiProperty()
	y: number = 0;

	@ApiProperty()
	name: string = "";

	@ApiProperty()
	description: string = "";

	@ApiProperty()
	type: StructureType = "camp";
}
