import {Connection} from "typeorm";
import {CharacterEntity} from "./character.entity";

export const characterProviders = [
	{
		provide: "CHARACTER_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(CharacterEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
