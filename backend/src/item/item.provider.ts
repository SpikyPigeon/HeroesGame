import {Connection} from "typeorm";
import {CategoryEntity} from "./category.entity";
import {ItemEntity} from "./item.entity";
import {RollEntity} from "./roll.entity";

export const itemProviders = [
	{
		provide: "CATEGORY_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(CategoryEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "ITEM_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(ItemEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "ROLL_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(RollEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
