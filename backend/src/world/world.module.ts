import {forwardRef, Module} from "@nestjs/common";
import {WorldController} from "./world.controller";
import {WorldService} from "./world.service";
import {worldProviders} from "./world.provider";
import {DatabaseModule} from "../database";
import {SquareService} from "./square.service";
import {SquareController} from "./square.controller";
import {UserModule} from "../user";
import {EncounterController, EncounterService} from "./encounter";
import {StructureController, StructureService} from "./structure";
import {ShopController, ShopService} from "./shop";
import {NpcController, NpcService} from "./npc";

@Module({
	exports: [
		EncounterService,
		StructureService,
		ShopService,
		NpcService,
		SquareService,
		WorldService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		EncounterController,
		StructureController,
		ShopController,
		NpcController,
		SquareController,
		WorldController,
	],
	providers: [
		...worldProviders,
		EncounterService,
		StructureService,
		ShopService,
		NpcService,
		SquareService,
		WorldService,
	],
})
export class WorldModule {
}
