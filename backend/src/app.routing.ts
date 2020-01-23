import {Routes} from "nest-router";

import {EncounterModule, ShopModule, WorldModule} from "./world";
import {CharacterModule} from "./character";
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
				],
			},
			{
				path: "/character",
				module: CharacterModule,
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
