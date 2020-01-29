import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {EncounterModule, NpcModule, ShopModule, StructureModule, WorldModule} from "./world";
import {CharacterModule} from "./character";
import {MessageModule, UserModule} from "./user";
import {MonsterModule} from "./monster";
import {ItemModule} from "./item";
import {BankModule} from "./bank";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		MessageModule,
		CharacterModule,
		WorldModule,
		ItemModule,
		BankModule,
		MonsterModule,
		EncounterModule,
		StructureModule,
		ShopModule,
		NpcModule,
	],
})
export class AppModule {
}
