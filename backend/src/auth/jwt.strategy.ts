import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, Logger} from "@nestjs/common";
import {UserEntity, UserService} from "../user";
import {jwtConstants} from "./constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	private readonly logger: Logger = new Logger(JwtStrategy.name);

	constructor(private readonly users: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignore: false,
			secretOrKey: jwtConstants.secret
		});
	}

	async validate(payload: any): Promise<UserEntity> {
		this.logger.log(`validate : ${payload.email}`);
		return await this.users.findOneById(payload.sub) as UserEntity;
	}
}
