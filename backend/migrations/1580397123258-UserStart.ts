import {MigrationInterface, QueryRunner} from "typeorm";

export class UserStart1580397123258 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "Bank" (id, "goldAmount")
            VALUES ('88cbe428-093e-4ca7-b625-86bfa96a47b2', 0),
                   ('92225cf9-84c7-48d2-a72f-c41471e5f257', 0);
            INSERT INTO "User"
            (id, "firstName", "lastName", email, "isActive", "isAdmin", password, "bankId")
            VALUES ('b637df5e-c4a7-4e71-a01e-0817b56a077e', 'Daniel', 'Grondin', 'king@numsgil.co',
                    true, true, '781254b531270ba3c5c8d937a5a1e523f3d18775304943148fda593e486b1b0f',
                    '88cbe428-093e-4ca7-b625-86bfa96a47b2'),
                   ('fc451518-83d3-4a67-8d0c-3bf74223d74c', 'Alexis', 'Lépine', 'exerapidoXthorn@gmail.com',
                    true, true, '8d7c4718fa6d759a1aaf2a49d22fa7b6313da8a00d53589dbe212da3bc3cc14e',
                    '92225cf9-84c7-48d2-a72f-c41471e5f257');
		`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE FROM "CharacterEquipment"
            WHERE "playerId" = (SELECT id FROM "PlayerCharacter" WHERE "ownerId" = 'b637df5e-c4a7-4e71-a01e-0817b56a077e');
            DELETE FROM "PlayerCharacter" WHERE "ownerId" = 'b637df5e-c4a7-4e71-a01e-0817b56a077e';
			DELETE FROM "CharacterEquipment"
			WHERE "playerId" = (SELECT id FROM "PlayerCharacter" WHERE "ownerId" = 'fc451518-83d3-4a67-8d0c-3bf74223d74c'); 
			DELETE FROM "PlayerCharacter" WHERE "ownerId" = 'fc451518-83d3-4a67-8d0c-3bf74223d74c';
            DELETE FROM "User" WHERE id = 'b637df5e-c4a7-4e71-a01e-0817b56a077e';
            DELETE FROM "User" WHERE id = 'fc451518-83d3-4a67-8d0c-3bf74223d74c';
            DELETE FROM "Bank" WHERE id = '88cbe428-093e-4ca7-b625-86bfa96a47b2';
            DELETE FROM "Bank" WHERE id = '92225cf9-84c7-48d2-a72f-c41471e5f257';
		`);
	}
}
