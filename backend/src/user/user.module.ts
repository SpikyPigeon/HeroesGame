import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database";
import {userProviders} from "./user.provider";
import {AuthModule} from "../auth";
import {BankModule} from "../bank";

@Module({
	exports: [
		UserService,
	],
	controllers: [
		UserController,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => AuthModule),
		forwardRef(() => BankModule),
	],
	providers: [
		...userProviders,
		UserService,
	]
})
export class UserModule {
}
