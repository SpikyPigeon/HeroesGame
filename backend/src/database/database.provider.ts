import {createConnection, getConnectionOptions} from "typeorm";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => {
			const options = await getConnectionOptions();
			Object.assign(options, {
				entities: [
					__dirname + "/../**/*.entity{.ts,.js}",
				],
			});
			return await createConnection(options);
		}
	}
];
