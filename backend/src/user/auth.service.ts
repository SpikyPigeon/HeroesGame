import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {AuthPayload, LoginResponseDto} from "./auth.dto";
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";

@Injectable()
export class AuthService {
	private readonly logger: Logger = new Logger(AuthService.name);

	constructor(
		private readonly users: UserService,
		private readonly jwt: JwtService
	) {
	}

	async verifyToken(token: string): Promise<AuthPayload> {
		try {
			return await this.jwt.verifyAsync<AuthPayload>(token);
		} catch(e) {
			throw new Error(e);
		}
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
		} catch (e) {
			return undefined;
		}
	}

	async login(user: UserEntity): Promise<LoginResponseDto> {
		const payload: AuthPayload = {
			email: user.email,
			sub: user.id,
		};
		return new LoginResponseDto(this.jwt.sign(payload));
	}

	async changePassword(userId: string, oldPass: string, newPass: string): Promise<UserEntity> {
		return await this.users.changePassword(userId, oldPass, newPass);
	}
}
