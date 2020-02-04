import {ApiProperty} from "@nestjs/swagger";

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

export class UpdateSquareImageInfo{
	@ApiProperty()
	filename: string = "";
}
