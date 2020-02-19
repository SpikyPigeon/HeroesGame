import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {CharacterModule} from "./character";
import {MonsterModule} from "./monster";
import {SocketModule} from "./socket";
import {WorldModule} from "./world";
import {ItemModule} from "./item";
import {BankModule} from "./bank";
import {UserModule} from "./user";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		BankModule,
		UserModule,
		CharacterModule,
		MonsterModule,
		ItemModule,
		WorldModule,
		SocketModule,
	],
})
export class AppModule {
}
