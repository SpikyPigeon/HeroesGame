import {MigrationInterface, QueryRunner} from "typeorm";

export class ContentPhaseOne1581966152592 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "MonsterType" (id, name, description)
            VALUES (4, 'Ant',
                    'This enormous mutant species of ants attacks any life form in sight to bring back as loot for their colony.'),
                   (5, 'Rabbit',
                    'This tiny, fury ball of adorableness only seeks to feed from greens. Does not pose a threat to anything other than greens.'),
                   (6, 'Demon',
                    'This hellish creature  only exists to torment - both the living and the dead. Possesses immense power and malice.'),
                   (7, 'Plant',
                    'Unlike other typical plants, this kind will attempt to consume any flesh in the vicinity - except for rabbits, their natural predator.'),
                   (8, 'Dragon',
                    'This ferocious reptilian creature never hesitates to use its flaming breath to wreck any settlement it crosses and take all valuables for itself.');
            INSERT INTO "Monster" (id, name, description, level, strength, dexterity, vitality, intellect,
                                   picture, "typeId")
            VALUES (5, 'Wild Rabbit', 'This little bunny searches for veggies to eat and poses no threat at all.', 1, 1,
                    7, 4, 0, 'rabbit.png', 4),
                   (6, 'Rabbit Demon',
                    'This creature roams the dark corners of the woods, only revealing itself to devour those who slaughter innocent rodents.',
                    10, 20, 15, 34, 10, 'rabbit_demon.png', 4),
                   (7, 'Horse Dragon', 'This is... unusual...', 20, 50, 50, 75, 25, 'dragon_horse.png', 8);
            INSERT INTO "Encounter" (id, "spawnChance", "minGold", "maxGold", "squareWorldId", "squareX", "squareY",
                                     "monsterId")
            VALUES (2, 0.5, 1, 2, 1, 1, 0, 5),
                   (3, 0.05, 1800, 3200, 1, 1, 0, 6),
                   (4, 0.5, 1, 2, 1, 0, 0, 5),
                   (5, 0.6, 40, 270, 1, 2, 1, 2),
                   (6, 0.2, 40, 140, 1, 0, 0, 2),
                   (7, 0.2, 40, 140, 1, 1, 0, 2);
            INSERT INTO "Item" (id, name, description, rarity, heal, "strengthMod", "dexterityMod",
                                "vitalityMod", "intellectMod", "criticalChanceMod", "criticalDamageMod",
                                "dodgeChanceMod", "healthMod", "manaMod", "armorMod", "damageMod", "itemDropMod",
                                "goldDropMod", "inventorySpace", special, skill, "createdAt", "updatedAt",
                                "stackLimit", "categoryId")
            VALUES (1, 'Carrot',
                    'Long, mostly orange, edible. Traces of small rodent teeth marks brings evidence that some horrible being stole this carrot from a poor harmless rabbit trying to eat it.',
                    'common', 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, null, null, '2020-02-14 11:22:55.408534',
                    '2020-02-14 11:22:55.408534', 20, 1);
            INSERT INTO "ItemRoll" (id, "strengthMult", "dexterityMult", "vitalityMult", "intellectMult",
                                    "criticalChanceMult", "criticalDamageMult", "dodgeChanceMult", "healthMult",
                                    "manaMult", "armorMult", "damageMult", "itemDropMult", "goldDropMult",
                                    special, "createdAt", "itemId")
            VALUES ('23bb085b-7140-4eb5-8258-88a16c084c8a', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, null,
                    '2020-02-17 13:17:16.003723', 1);
            INSERT INTO "Shop" (id, "priceMod")
            VALUES (1, 1);
            INSERT INTO "Structure" (id, name, description, type, "squareWorldId", "squareX", "squareY",
                                     "shopId")
            VALUES (1, 'Northwestern Goblin Camp',
                    'Home to the Frangobble clan, a bunch of goblins raiders who like to ambush unwary travellers.',
                    'monster-camp', 1, 2, 1, 1),
                   (2, 'Goblot''s tent', 'Goblot''s not in there. ', 'caravan', 1, 2, 1, null);
            INSERT INTO "NonPlayerCharacter" (id, name, description, "squareWorldId", "squareX", "squareY",
                                              "shopId")
            VALUES (1, 'Goblot', 'A blind goblin who only sells carrots.', 1, 2, 1, 1);
		`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE
            FROM "NonPlayerCharacter"
            WHERE id = 1;
            DELETE
            FROM "Structure"
            WHERE id < 3;
            DELETE
            FROM "Shop"
            WHERE id = 1;
            DELETE
            FROM "ItemRoll"
            WHERE "createdAt" = '2020-02-17 13:17:16.003723';
            DELETE
            FROM "Item"
            WHERE id = 1;
            DELETE
            FROM "Encounter"
            WHERE id BETWEEN 2 AND 7;
            DELETE
            FROM "Monster"
            WHERE id BETWEEN 5 AND 7;
            DELETE
            FROM "MonsterType"
            WHERE id BETWEEN 4 AND 8;
		`);
	}
}
