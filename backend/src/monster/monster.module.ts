import {forwardRef, Module} from "@nestjs/common";
import {MonsterController} from "./monster.controller";
import {MonsterService} from "./monster.service";
import {monsterProviders} from "./monster.provider";
import {DatabaseModule} from "../database";
import {AuthModule} from "../auth";

@Module({
	exports: [
		MonsterService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => AuthModule)
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
