import {Connection} from "typeorm";
import {SlapEntity} from "./slap.entity";

export const slapProviders = [
	{
		provide: "CHARACTER_SLAP_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(SlapEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
