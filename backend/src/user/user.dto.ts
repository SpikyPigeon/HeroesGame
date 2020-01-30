import {ApiProperty} from "@nestjs/swagger";
import {CreateUserInfo, ModifyUserProfile} from "heroes-common";

export class CreateUserInfoDto implements CreateUserInfo {
	@ApiProperty()
	email: string = "";

	@ApiProperty()
	password: string = "";

	@ApiProperty()
	firstName: string = "";

	@ApiProperty()
	lastName: string = "";
}

export class ModifyUserProfileDto implements ModifyUserProfile {
	@ApiProperty()
	email: string = "";

	@ApiProperty()
	firstName: string = "";

	@ApiProperty()
	lastName: string = "";
}
