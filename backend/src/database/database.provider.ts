import {createConnection} from "typeorm";
import {join} from "path";

export const databaseProviders = [
	{
		provide: "DATABASE_CONNECTION",
		useFactory: async () => await createConnection(
			process.env.NODE_ENV === "production" ?
				{
					type: "postgres",
					host: "localhost",
					username: "heroes",
					password: "",
					database: "heroes",
					synchronize: true,
					entities: [
						__dirname + "/../**/*.entity{.ts,.js}",
					],
				} :
				{
					type: "sqlite",
					database: join(__dirname, "../../data/api.sqlite"),
					synchronize: true,
					entities: [
						__dirname + "/../**/*.entity{.ts,.js}",
					],
				}
		)
	}
];
