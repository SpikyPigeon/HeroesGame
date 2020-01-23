import {Connection} from "typeorm";
import {NpcEntity} from "./npc.entity";

export const npcProviders = [
	{
		provide: "NPC_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(NpcEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
