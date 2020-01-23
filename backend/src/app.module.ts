import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {CharacterModule} from "./character";
import {MonsterModule} from "./monster";
import {WorldModule} from "./world";
import {UserModule} from "./user";
import {ItemModule} from "./item";
import {BankModule} from "./bank";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		CharacterModule,
		WorldModule,
		ItemModule,
		BankModule,
		MonsterModule,
	],
})
export class AppModule {
}
