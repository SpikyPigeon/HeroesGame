import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database";
import {userProviders} from "./user.provider";
import {MessageModule} from "./message";
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
		MessageModule,
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
