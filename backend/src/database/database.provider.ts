import {createConnection} from "typeorm";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => await createConnection({
			type: "postgres",
			host: "localhost",
			username: "heroes",
			password: "ReactHeroes",
			database: "heroes",
			uuidExtension: "pgcrypto",
			synchronize: true,
			entities: [
				__dirname + "/../**/*.entity{.ts,.js}",
			],
		})
	}
];
