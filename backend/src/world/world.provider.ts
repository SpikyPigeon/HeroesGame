import {Connection} from "typeorm";
import {SquareEntity} from "./square.entity";
import {WorldEntity} from "./world.entity";

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
	}
];
