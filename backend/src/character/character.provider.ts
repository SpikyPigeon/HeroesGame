import {Connection} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";

export const characterProviders = [
	{
		provide: "CHARACTER_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(CharacterEntity),
		inject: ["DATABASE_CONNECTION"]
	},
	{
		provide: "EQUIPMENT_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(EquipmentEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
