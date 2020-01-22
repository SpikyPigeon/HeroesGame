import {Module} from "@nestjs/common";
import {WorldController} from "./world.controller";
import {WorldService} from "./world.service";
import {worldProviders} from "./world.provider";
import {DatabaseModule} from "../database";
import {SquareService} from "./square.service";
import {SquareController} from "./square.controller";

@Module({
	exports: [
		SquareService,
		WorldService,
	],
	imports: [
		DatabaseModule,
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
