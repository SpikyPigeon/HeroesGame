import {forwardRef, Module} from "@nestjs/common";
import {SocketService} from "./socket.service";
import {ChatGateway} from "./chat.gateway";
import {UserModule} from "../user";

@Module({
	imports: [
		forwardRef(() => UserModule),
	],
	providers: [
		SocketService,
		ChatGateway,
	],
	exports: [
		ChatGateway,
	],
})
export class SocketModule {
}
