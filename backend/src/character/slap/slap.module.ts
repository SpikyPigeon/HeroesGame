import {forwardRef, Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {CharacterModule} from "../character.module";
import {SlapService} from "./slap.service";
import {SlapController} from "./slap.controller";
import {slapProviders} from "./slap.provider";

@Module({
	exports: [
		SlapService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => CharacterModule),
	],
	controllers: [
		SlapController,
	],
	providers: [
		...slapProviders,
		SlapService,
	],
})
export class SlapModule {
}
