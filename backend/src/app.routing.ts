import {Routes} from "nest-router";

import {CharacterModule} from "./character";
import {WorldModule} from "./world";
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
		],
	}
];
