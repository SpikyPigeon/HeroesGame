import {Routes} from "nest-router";

import {EncounterModule, NpcModule, ShopModule, StructureModule, WorldModule} from "./world";
import {CharacterModule, InventoryModule, SlapModule} from "./character";
import {MessageModule, UserModule} from "./user";
import {MonsterModule} from "./monster";
import {ItemModule} from "./item";
import {BankModule} from "./bank";
import {AuthModule} from "./auth";

export const routes: Routes = [
	{
		path: "/api",
		children: [
			{
				path: "/auth",
				module: AuthModule,
			},
			{
				path: "/user",
				module: UserModule,
				children: [
					{
						path: "/message",
						module: MessageModule,
					},
				],
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
					{
						path: "/slap",
						module: SlapModule,
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
