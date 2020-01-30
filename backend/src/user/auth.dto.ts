import {ApiProperty} from "@nestjs/swagger";
import {LoginInfo, LoginResponse, PasswordChange} from "heroes-common";

export interface AuthPayload {
	email: string;
	sub: string;
}

export class LoginResponseDto implements LoginResponse {
	@ApiProperty()
	access_token: string;

	constructor(access_token: string) {
		this.access_token = access_token;
	}
}

export class LoginInfoDto implements LoginInfo {
	@ApiProperty()
	public readonly email: string;

	@ApiProperty()
	public readonly password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export class PasswordChangeInfoDto implements PasswordChange {
	@ApiProperty()
	public readonly oldPass: string;

	@ApiProperty()
	public readonly newPass: string;

	constructor(
		oldPass: string,
		newPass: string
	) {
		this.oldPass = oldPass;
		this.newPass = newPass;
	}
}
