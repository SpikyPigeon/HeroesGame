import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {structureProviders} from "./structure.provider";
import {StructureController} from "./structure.controller";
import {StructureService} from "./structure.service";

@Module({
	exports: [
		StructureService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		StructureController,
	],
	providers: [
		...structureProviders,
		StructureService,
	],
})
export class StructureModule {
}
