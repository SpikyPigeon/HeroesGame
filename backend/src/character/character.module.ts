import {Module} from "@nestjs/common";
import {CharacterController} from "./character.controller";
import {CharacterService} from "./character.service";
import {characterProviders} from "./character.provider";
import {DatabaseModule} from "../database";

@Module({
	exports: [
		CharacterService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [CharacterController],
	providers: [
		...characterProviders,
		CharacterService,
	],
})
export class CharacterModule {
}
