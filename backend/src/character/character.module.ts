import {forwardRef, Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {CharacterService} from "./character.service";
import {characterProviders} from "./character.provider";
import {DatabaseModule} from "../database";
import {InventoryController} from "./inventory.controller";
import {AvatarService} from "./avatar.service";
import {InventoryService} from "./inventory.service";
import {ItemModule} from "../item";

@Module({
	exports: [
		AvatarService,
		CharacterService,
		InventoryService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => ItemModule),
	],
	controllers: [
		CharacterController,
		InventoryController,
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
