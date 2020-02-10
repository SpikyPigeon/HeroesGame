import {Connection} from "typeorm";
import {SquareEntity} from "./square.entity";
import {WorldEntity} from "./world.entity";
import {EncounterDropEntity, EncounterEntity} from "./encounter";
import {NpcEntity} from "./npc";
import {ShopEntity, ShopSellsEntity} from "./shop";
import {StructureEntity} from "./structure";

export const worldProviders = [
	{
		provide: "SQUARE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(SquareEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "WORLD_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(WorldEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "ENCOUNTER_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(EncounterEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "ENCOUNTER_DROP_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(EncounterDropEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "NPC_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(NpcEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "SHOP_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(ShopEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "SHOP_SELLS_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(ShopSellsEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "STRUCTURE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(StructureEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
