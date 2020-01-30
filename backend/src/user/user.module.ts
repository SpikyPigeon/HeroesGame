import {forwardRef, Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./auth/local.strategy";
import {UserController} from "./user.controller";
import {JwtStrategy} from "./auth/jwt.strategy";
import {userProviders} from "./user.provider";
import {jwtConstants} from "./auth/constants";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database";
import {MessageModule} from "./message";
import {BankModule} from "../bank";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";

@Module({
	exports: [
		AuthService,
		UserService,
	],
	controllers: [
		AuthController,
		UserController,
	],
	imports: [
		DatabaseModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {expiresIn: "3 days"}
		}),
		MessageModule,
		forwardRef(() => BankModule),
	],
	providers: [
		...userProviders,
		AuthService,
		UserService,
		LocalStrategy,
		JwtStrategy,
	]
})
export class UserModule {
}
