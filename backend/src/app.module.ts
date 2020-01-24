import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";

import {routes} from "./app.routing";

import {EncounterModule, NpcModule, ShopModule, StructureModule, WorldModule} from "./world";
import {CharacterModule, InventoryModule} from "./character";
import {MonsterModule} from "./monster";
import {UserModule} from "./user";
import {ItemModule} from "./item";
import {BankModule} from "./bank";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		CharacterModule,
		InventoryModule,
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
