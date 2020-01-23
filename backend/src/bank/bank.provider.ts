import {Connection} from "typeorm";
import {BankEntity} from "./bank.entity";

export const bankProviders = [
	{
		provide: "BANK_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(BankEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
