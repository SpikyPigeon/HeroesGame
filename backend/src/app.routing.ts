import {Routes} from "nest-router";

import {EncounterModule, NpcModule, ShopModule, StructureModule, WorldModule} from "./world";
import {CharacterModule, InventoryModule} from "./character";
import {MonsterModule} from "./monster";
import {UserModule} from "./user";
import {ItemModule} from "./item";
import {BankModule} from "./bank";

export const routes: Routes = [
	{
		path: "/api",
		children: [
			{
				path: "/user",
				module: UserModule,
			},
			{
				path: "/world",
				module: WorldModule,
				children: [
					{
						path: "/shop",
						module: ShopModule,
					},
					{
						path: "/encounter",
						module: EncounterModule,
					},
					{
						path: "/structure",
						module: StructureModule,
					},
					{
						path: "/npc",
						module: NpcModule,
					},
				],
			},
			{
				path: "/character",
				module: CharacterModule,
				children: [
					{
						path: "/inventory",
						module: InventoryModule,
					},
				],
			},
			{
				path: "/item",
				module: ItemModule,
			},
			{
				path: "/bank",
				module: BankModule,
			},
			{
				path: "/monster",
				module: MonsterModule,
			},
		],
	}
];
