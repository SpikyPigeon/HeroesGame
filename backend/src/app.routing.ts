import {Routes} from "nest-router";

import {CharacterModule} from "./character";
import {WorldModule} from "./world";
import {UserModule} from "./user";

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
		],
	}
];
