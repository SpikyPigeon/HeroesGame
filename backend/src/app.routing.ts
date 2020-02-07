import {Routes} from "nest-router";

import {WorldModule} from "./world";
import {CharacterModule, InventoryModule, SlapModule} from "./character";
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
