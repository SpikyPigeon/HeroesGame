import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, Logger} from "@nestjs/common";
import {jwtConstants} from "./constants";
import {UserService} from "../user.service";
import {UserEntity} from "../user.entity";
import {AuthPayload} from "../auth.dto";

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

	async validate(payload: AuthPayload): Promise<UserEntity> {
		this.logger.log(`validate : ${payload.email}`);
		return await this.users.findOneById(payload.sub) as UserEntity;
	}
}
