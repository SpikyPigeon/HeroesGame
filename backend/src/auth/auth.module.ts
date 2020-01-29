import {PassportModule} from "@nestjs/passport";
import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from './auth.service';
import {UserModule} from "../user";
import {LocalStrategy} from "./local.strategy";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";
import {jwtConstants} from "./constants";

@Module({
	imports: [
		forwardRef(() => UserModule),
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {expiresIn: "3 days"}
		})
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
	],
	exports: [
		AuthService,
	],
	controllers: [
		AuthController,
	],
})
export class AuthModule {
}
