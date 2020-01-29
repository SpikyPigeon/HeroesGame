import {forwardRef, Module} from "@nestjs/common";
import {WorldController} from "./world.controller";
import {WorldService} from "./world.service";
import {worldProviders} from "./world.provider";
import {DatabaseModule} from "../database";
import {SquareService} from "./square.service";
import {SquareController} from "./square.controller";
import {EncounterModule} from "./encounter";
import {NpcModule} from "./npc";
import {ShopModule} from "./shop";
import {StructureModule} from "./structure";
import {AuthModule} from "../auth";

@Module({
	exports: [
		SquareService,
		WorldService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => AuthModule),
		EncounterModule,
		NpcModule,
		ShopModule,
		StructureModule,
	],
	controllers: [
		SquareController,
		WorldController,
	],
	providers: [
		...worldProviders,
		SquareService,
		WorldService,
	],
})
export class WorldModule {
}
