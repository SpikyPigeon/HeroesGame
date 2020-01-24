import {Routes} from "nest-router";

import {EncounterModule, NpcModule, ShopModule, StructureModule, WorldModule} from "./world";
import {CharacterModule, InventoryModule} from "./character";
import {MessageModule, UserModule} from "./user";
import {MonsterModule} from "./monster";
import {ItemModule} from "./item";
import {BankModule} from "./bank";

export const routes: Routes = [
	{
		path: "/api",
		children: [
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
