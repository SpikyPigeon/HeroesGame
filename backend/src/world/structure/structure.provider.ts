import {Connection} from "typeorm";
import {StructureEntity} from "./structure.entity";

export const structureProviders = [
	{
		provide: "STRUCTURE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(StructureEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
