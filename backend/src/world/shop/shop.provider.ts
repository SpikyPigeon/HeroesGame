import {Connection} from "typeorm";
import {ShopEntity} from "./shop.entity";
import {ShopSellsEntity} from "./shop-sells.entity";

export const shopProviders = [
	{
		provide: "SHOP_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(ShopEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "SHOP_SELLS_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(ShopSellsEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
