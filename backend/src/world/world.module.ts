import {forwardRef, Module} from "@nestjs/common";
import {EncounterController, EncounterService} from "./encounter";
import {StructureController, StructureService} from "./structure";
import {SquareController} from "./square.controller";
import {ShopController, ShopService} from "./shop";
import {WorldController} from "./world.controller";
import {NpcController, NpcService} from "./npc";
import {worldProviders} from "./world.provider";
import {SquareService} from "./square.service";
import {WorldService} from "./world.service";
import {DatabaseModule} from "../database";
import {UserModule} from "../user";

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
