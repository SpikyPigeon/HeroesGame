import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserEntity, UserService} from "../user";
import crypto from "crypto";
import {AuthPayload, LoginResponse} from "./auth.dto";

@Injectable()
export class AuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		private readonly users: UserService,
		private readonly jwt: JwtService
	) {
	}

	private static hashPassword(password: string): string {
		return crypto.createHmac("sha256", password).digest("hex");
	}

	async validateUser(email: string, password: string): Promise<UserEntity | undefined> {
		this.logger.log(`Searching for user email ${email}`);

		try {
			let user = await this.users.findOneByEmail(email);
			if (await this.users.validatePassword(user.id, password)) {
				return user;
			} else {
				return undefined;
			}
		} catch(e) {
			return undefined;
		}
	}

	async login(user: UserEntity): Promise<LoginResponse> {
		return new LoginResponse(this.jwt.sign(new AuthPayload(user.email, user.id)));
	}

	async changePassword(userId: string, oldPass: string, newPass: string): Promise<UserEntity> {
		return await this.users.changePassword(userId, oldPass, newPass);
	}
}
