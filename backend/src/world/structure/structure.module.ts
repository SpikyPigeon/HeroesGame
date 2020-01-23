import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {structureProviders} from "./structure.provider";
import {StructureController} from "./structure.controller";
import {StructureEntity} from "./structure.entity";

@Module({
	exports: [
		StructureEntity,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		StructureController,
	],
	providers: [
		...structureProviders,
		StructureEntity,
	],
})
export class StructureModule {
}
