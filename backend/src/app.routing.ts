import {Routes} from "nest-router";
import {UserModule} from "./user";

export const routes: Routes = [
	{
		path: "/api",
		children: [
			{
				path: "/user",
				module: UserModule,
			},
		],
	}
];
