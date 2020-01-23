import {Module} from "@nestjs/common";
import {MonsterController} from "./monster.controller";
import {MonsterService} from "./monster.service";
import {monsterProviders} from "./monster.provider";
import {DatabaseModule} from "../database";

@Module({
	exports: [
		MonsterService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		MonsterController,
	],
	providers: [
		...monsterProviders,
		MonsterService,
	],
})
export class MonsterModule {
}
