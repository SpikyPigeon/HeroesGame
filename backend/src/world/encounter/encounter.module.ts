import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {encounterProviders} from "./encounter.provider";
import {EncounterController} from "./encounter.controller";
import {EncounterService} from "./encounter.service";

@Module({
	exports: [
		EncounterService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		EncounterController,
	],
	providers: [
		...encounterProviders,
		EncounterService,
	],
})
export class EncounterModule {
}
