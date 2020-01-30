import {forwardRef, Module} from "@nestjs/common";
import {MonsterController} from "./monster.controller";
import {MonsterService} from "./monster.service";
import {monsterProviders} from "./monster.provider";
import {DatabaseModule} from "../database";
import {UserModule} from "../user";

@Module({
	exports: [
		MonsterService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule)
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
