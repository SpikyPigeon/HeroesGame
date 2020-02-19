import {forwardRef, Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {characterProviders} from "./character.provider";
import {CharacterService} from "./character.service";
import {AvatarService} from "./avatar.service";
import {InventoryModule} from "./inventory";
import {DatabaseModule} from "../database";
import {ChatGateway} from "./chat.gateway";
import {UserModule} from "../user";
import {SlapModule} from "./slap";

@Module({
	exports: [
		AvatarService,
		CharacterService,
	],
	imports: [
		DatabaseModule,
		InventoryModule,
		SlapModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		CharacterController,
	],
	providers: [
		...characterProviders,
		ChatGateway,
		AvatarService,
		CharacterService,
	],
})
export class CharacterModule {
}
