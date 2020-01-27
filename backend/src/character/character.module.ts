import {forwardRef, Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {CharacterService} from "./character.service";
import {characterProviders} from "./character.provider";
import {DatabaseModule} from "../database";
import {AvatarService} from "./avatar.service";
import {InventoryModule} from "./inventory";
import {WorldModule} from "../world";

@Module({
	exports: [
		AvatarService,
		CharacterService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => InventoryModule),
		forwardRef(() => WorldModule),
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
