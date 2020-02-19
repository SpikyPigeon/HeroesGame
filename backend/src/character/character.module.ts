import {forwardRef, Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {characterProviders} from "./character.provider";
import {CharacterService} from "./character.service";
import {AvatarService} from "./avatar.service";
import {InventoryController, InventoryService} from "./inventory";
import {DatabaseModule} from "../database";
import {UserModule} from "../user";
import {SlapModule} from "./slap";

@Module({
	exports: [
		AvatarService,
		CharacterService,
		InventoryService,
	],
	imports: [
		DatabaseModule,
		SlapModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		InventoryController,
		CharacterController,
	],
	providers: [
		...characterProviders,
		AvatarService,
		CharacterService,
		InventoryService,
	],
})
export class CharacterModule {
}
