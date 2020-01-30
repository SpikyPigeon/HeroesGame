import {Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {UserEntity} from "../user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	private readonly logger: Logger = new Logger(LocalStrategy.name);

	constructor(private readonly auth: AuthService) {
		super({
			usernameField: "email",
			passwordField: "password"
		});
	}

	async validate(email: string, password: string): Promise<UserEntity> {
		this.logger.log(`Attempting validation of ${email}`);

		const user = await this.auth.validateUser(email, password);
		if (user === undefined) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
