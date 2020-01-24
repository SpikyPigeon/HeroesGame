import {Connection} from "typeorm";
import {MessageEntity} from "./message.entity";

export const messageProviders = [
	{
		provide: "USER_MESSAGE_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(MessageEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
