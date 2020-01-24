import {Connection} from "typeorm";
import {InventoryEntity} from "./inventory.entity";

export const inventoryProviders = [
	{
		provide: "INVENTORY_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(InventoryEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
