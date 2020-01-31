import {forwardRef, Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {CharacterService} from "./character.service";
import {characterProviders} from "./character.provider";
import {DatabaseModule} from "../database";
import {AvatarService} from "./avatar.service";
import {InventoryModule} from "./inventory";
import {SlapModule} from "./slap";
import {WorldModule} from "../world";
import {UserModule} from "../user";

@Module({
	exports: [
		AvatarService,
		CharacterService,
	],
	imports: [
		DatabaseModule,
		InventoryModule,
		SlapModule,
		forwardRef(() => WorldModule),
		forwardRef(() => UserModule),
	],
	controllers: [
		CharacterController,
	],
	providers: [
		...characterProviders,
		AvatarService,
		CharacterService,
	],
})
export class CharacterModule {
}
