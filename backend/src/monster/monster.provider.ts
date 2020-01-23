import {Connection} from "typeorm";
import {MonsterEntity} from "./monster.entity";
import {MonsterTypeEntity} from "./monster-type.entity";

export const monsterProviders = [
	{
		provide: "MONSTER_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(MonsterEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "MONSTER_TYPE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(MonsterTypeEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
