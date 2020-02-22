import {MigrationInterface, QueryRunner} from "typeorm";

export class ContentPhaseTwo1582381886031 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "Item" (id, name, description, rarity, heal, "strengthMod", "dexterityMod", "vitalityMod",
                                "intellectMod", "criticalChanceMod", "criticalDamageMod", "dodgeChanceMod", "healthMod",
                                "manaMod", "armorMod", "damageMod", "itemDropMod", "goldDropMod", "inventorySpace",
                                "stackLimit", image, "categoryId")
            VALUES (6, 'Rusty Long Sword', 'A long sword that got neglected from its previous owner or owners',
                    'common', 0, 4, 2, 0, 0, 2, 3, 0, 0, 0, 0, 4, 0, 0, 0, 1, 'sword_long.png', 16);
            INSERT INTO "EncounterDrop" ("itemId", "encounterId", "dropChance", "minQuantity", "maxQuantity")
            VALUES (5, 1, 0.2, 1, 3),
                   (1, 2, 0.4, 1, 4),
                   (1, 4, 0.4, 1, 4),
                   (1, 15, 0.4, 1, 4),
                   (1, 16, 0.4, 1, 4),
                   (1, 17, 0.4, 1, 4),
                   (2, 5, 0.6, 1, 1),
                   (2, 6, 0.6, 1, 1),
                   (2, 7, 0.6, 1, 1),
                   (6, 11, 0.4, 1, 1);
		`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE FRON "EncouterDrop"
            WHERE itemId = 1 OR itemId = 2 OR itemId = 5 OR itemId = 6;
            DELETE
            FROM "Item"
            WHERE id = 6;
		`);
	}
}
