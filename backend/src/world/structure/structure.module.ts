import {forwardRef, Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {structureProviders} from "./structure.provider";
import {StructureController} from "./structure.controller";
import {StructureService} from "./structure.service";
import {UserModule} from "../../user";

@Module({
	exports: [
		StructureService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
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
