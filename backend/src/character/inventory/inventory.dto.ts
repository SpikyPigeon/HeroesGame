import {ApiProperty} from "@nestjs/swagger";
import {CreateInventoryInfo} from "heroes-common";

export class CreateInventoryDto implements CreateInventoryInfo {
	@ApiProperty()
	roll: string = "";

	@ApiProperty()
	quantity: number = 0;
}
