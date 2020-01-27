import {createConnection} from "typeorm";
import {
	EncounterEntity,
	NpcEntity,
	ShopEntity,
	ShopSellsEntity,
	SquareEntity,
	StructureEntity,
	WorldEntity
} from "./src/world";
import {AvatarEntity, CharacterEntity, EquipmentEntity, InventoryEntity, SlapEntity} from "./src/character";
import {CategoryEntity, ItemEntity, RollEntity} from "./src/item";
import {BankEntity} from "./src/bank";
import {MessageEntity, UserEntity} from "./src/user";
import {MonsterEntity, MonsterTypeEntity} from "./src/monster";

createConnection({
	type: "postgres",
	host: "localhost",
	username: "heroes",
	password: "ReactHeroes",
	database: "heroes",
	uuidExtension: "pgcrypto",
	synchronize: true,
	entities: [
		WorldEntity,
		SquareEntity,
		CharacterEntity,
		ItemEntity,
		RollEntity,
		BankEntity,
		UserEntity,
		MessageEntity,
		SlapEntity,
		CategoryEntity,
		MonsterEntity,
		MonsterTypeEntity,
		EncounterEntity,
		NpcEntity,
		ShopEntity,
		ShopSellsEntity,
		StructureEntity,
		AvatarEntity,
		EquipmentEntity,
		InventoryEntity,
	],
}).then(async conn => {
	const worlds = conn.getRepository(WorldEntity);
	const squares = conn.getRepository(SquareEntity);

	const testW = await worlds.save(worlds.create({
		bgImage: "",
		color: "",
		limitX: 5,
		limitY: 5,
		name: "Test",
	}));

	console.log(testW.id);

	for (let x = 0; x <= testW.limitX; x++) {
		for (let y = 0; y <= testW.limitY; y++) {
			const square = await squares.save(squares.create({
				world: testW,
				x,
				y,
				image: "",
			}));

			console.log(`W: ${square.worldId} X: ${square.x} Y: ${square.y}`);
		}
	}
}).catch(reason => console.error(reason));
