import {Connection} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarEntity} from "./avatar.entity";

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
	},
	{
		provide: "AVATAR_REPOSITORY",
		useFactory: (connection: Connection) => connection.getRepository(AvatarEntity),
		inject: ["DATABASE_CONNECTION"]
	}
];
