import {forwardRef, Module} from "@nestjs/common";
import {MessageService} from "./message.service";
import {DatabaseModule} from "../../database";
import {UserModule} from "../user.module";
import {MessageController} from "./message.controller";
import {messageProviders} from "./message.provider";

@Module({
	exports: [
		MessageService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		MessageController,
	],
	providers: [
		...messageProviders,
		MessageService,
	],
})
export class MessageModule {
}
