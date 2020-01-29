import {ApiProperty} from "@nestjs/swagger";

export class CreateUserInfo {
	@ApiProperty()
	email: string = "";

	@ApiProperty()
	password: string = "";

	@ApiProperty()
	firstName: string = "";

	@ApiProperty()
	lastName: string = "";
}

export class ModifyUserProfile {
	@ApiProperty()
	email: string = "";

	@ApiProperty()
	firstName: string = "";

	@ApiProperty()
	lastName: string = "";
}
