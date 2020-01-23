import {Connection} from "typeorm";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";

export const encounterProviders = [
	{
		provide: "ENCOUNTER_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(EncounterEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "ENCOUNTER_DROP_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(EncounterDropEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
