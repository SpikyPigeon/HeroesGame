import {ApiProperty} from "@nestjs/swagger";

export class CreateMessageInfo{
	@ApiProperty()
	receiver: string = "";

	@ApiProperty()
	previous : string = "";

	@ApiProperty()
	title: string = "";

	@ApiProperty()
	content : string = "";
}
