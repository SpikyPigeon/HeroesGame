import {Module} from "@nestjs/common";
import {WorldController} from "./world.controller";
import {WorldService} from "./world.service";
import {worldProviders} from "./world.provider";
import {DatabaseModule} from "../database";
import {SquareService} from "./square.service";

@Module({
	exports: [
		SquareService,
		WorldService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [WorldController],
	providers: [
		...worldProviders,
		SquareService,
		WorldService,
	],
})
export class WorldModule {
}
