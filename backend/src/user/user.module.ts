import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {DatabaseModule} from "../database";
import {userProviders} from "./user.provider";

@Module({
	exports: [UserService],
	controllers: [UserController],
	imports: [
		DatabaseModule,
	],
	providers: [
		...userProviders,
		UserService,
	]
})
export class UserModule {
}
