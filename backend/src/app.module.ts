import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {CharacterModule} from "./character";
import {MonsterModule} from "./monster";
import {WorldModule} from "./world";
import {ItemModule} from "./item";
import {BankModule} from "./bank";
import {UserModule} from "./user";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		CharacterModule,
		MonsterModule,
		ItemModule,
		BankModule,
		WorldModule,
	],
})
export class AppModule {
}
