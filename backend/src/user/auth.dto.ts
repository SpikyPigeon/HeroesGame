import {ApiProperty} from "@nestjs/swagger";

export interface AuthPayload {
	email: string;
	sub: string;
}

export class LoginResponse {
	@ApiProperty()
	access_token: string;

	constructor(access_token: string) {
		this.access_token = access_token;
	}
}

export class LoginDefinition {
	@ApiProperty()
	public readonly email: string;

	@ApiProperty()
	public readonly password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export class PasswordChangeDefinition {
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
