import {forwardRef, Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database";
import {userProviders} from "./user.provider";
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
		forwardRef(() => BankModule),
	],
	providers: [
		...userProviders,
		UserService,
	]
})
export class UserModule {
}
