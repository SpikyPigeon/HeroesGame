import {MigrationInterface, QueryRunner} from "typeorm";

export class ContentPhaseOne1581966152592 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "MonsterType" (id, name, description)
            VALUES (4, 'Ant', 'This enormous mutant species of ants attacks any life form in sight to bring back as loot for their colony.'),
                   (5, 'Rabbit', 'This tiny, fury ball of adorableness only seeks to feed from greens. Does not pose a threat to anything other than greens.'),
                   (6, 'Demon', 'This hellish creature  only exists to torment - both the living and the dead. Possesses immense power and malice.'),
                   (7, 'Plant', 'Unlike other typical plants, this kind will attempt to consume any flesh in the vicinity - except for rabbits, their natural predator.'),
                   (8, 'Dragon', 'This ferocious reptilian creature never hesitates to use its flaming breath to wreck any settlement it crosses and take all valuables for itself.'),
                   (9, 'Wolf', 'Wild wolves hunt in small packs and usually don''t bother humans. Usually.');
            INSERT INTO "Monster" (id, name, description, level, strength, dexterity, vitality, intellect, picture, "typeId")
            VALUES (5, 'Wild Rabbit', 'This little bunny searches for veggies to eat and poses no threat at all.', 1, 1, 7, 4, 0, 'rabbit.png', 4),
                   (6, 'Rabbit Demon', 'This creature roams the dark corners of the woods, only revealing itself to devour those who slaughter innocent rodents.', 10, 20, 15, 34, 10, 'rabbit_demon.png', 4),
                   (7, 'Horse Dragon', 'This is... unusual...', 20, 50, 50, 75, 25, 'dragon_horse.png', 8),
                   (8, 'Clerwood Wolf', 'This species of grey wolf lives in the Clerwood  Forest, hunting rabbit and sometimes goblins.', 6, 10, 20, 20, 10, 'wolf_grey.png', 9),
                   (9, 'Clerwood Gobleader', 'This is the new boss of the goblin clans in the Clerwood Forest. Apparently got promoted recently judging by the goblin blood on its blade.', 9, 13, 15, 19, 9, 'goblin-boss.png', 1);
            INSERT INTO "Encounter" (id, "spawnChance", "minGold", "maxGold", "squareWorldId", "squareX", "squareY", "monsterId")
            VALUES (2, 0.5, 1, 2, 1, 1, 0, 5),
                   (3, 0.05, 1800, 3200, 1, 1, 0, 6),
                   (4, 0.5, 1, 2, 1, 0, 0, 5),
                   (5, 0.6, 40, 270, 1, 2, 1, 2),
                   (6, 0.2, 40, 140, 1, 0, 0, 2),
                   (7, 0.2, 40, 140, 1, 1, 0, 2),
                   (8, 0.3, 60, 120, 1, 2, 1, 3),
                   (9, 0.2, 70, 150, 1, 2, 1, 4),
                   (10, 0.08, 1000, 10000, 1, 5, 2, 7),
                   (11, 0.1, 150, 300, 1, 2, 1, 9),
                   (12, 0.25, 10, 50, 1, 1, 0, 8),
                   (13, 0.25, 10, 50, 1, 2, 0, 8),
                   (14, 0.25, 10, 50, 1, 1, 1, 8),
                   (15, 0.4, 1, 2, 1, 2, 0, 5),
                   (16, 0.4, 1, 2, 1, 1, 1, 5),
                   (17, 0.4, 1, 2, 1, 1, 0, 5);
            INSERT INTO "Item" (id, name, description, rarity, heal, "strengthMod", "dexterityMod",
                                "vitalityMod", "intellectMod", "criticalChanceMod", "criticalDamageMod",
                                "dodgeChanceMod", "healthMod", "manaMod", "armorMod", "damageMod", "itemDropMod",
                                "goldDropMod", "inventorySpace", "stackLimit", "categoryId", image)
            VALUES (1, 'Carrot', 'Long, mostly orange, edible. Traces of small rodent teeth marks brings evidence that some horrible being stole this carrot from a poor harmless rabbit trying to eat it.', 'common', 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 20, 1, 'carrot.png'),
                   (2, 'Short Dagger', 'It''s pretty much what it is: a short dagger, made for cutting through any obstacle or creature that annoys you.', 'common', 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 17, 'dagger_common.png'),
                   (3, 'Metal Combat Glove', 'A reinforced glove made for PUNCHING!', 'uncommon', 0, 3, 0, 0, 0, 1, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1, 21, 'glove_metal.png'),
                   (4, 'Leadber Soldier Shield', 'A heavy, strong shield used by the guard of Fort Leadber for its durability.', 'uncommon', 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 10, 0, 0, 0, 0, 1, 7, 'Kite_Shield.png'),
                   (5, 'Vigor Juice', 'A juicy mix of some fruits from the Clerwood Forest. Revigorates and heals minor wounds when drunk.', 'uncommon', 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 'potion_red.png');
            INSERT INTO "ItemRoll" (id, "strengthMult", "dexterityMult", "vitalityMult", "intellectMult",
                                    "criticalChanceMult", "criticalDamageMult", "dodgeChanceMult", "healthMult",
                                    "manaMult", "armorMult", "damageMult", "itemDropMult", "goldDropMult", "itemId")
            VALUES ('23bb085b-7140-4eb5-8258-88a16c084c8a', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
                   ('ebd43941-cd61-49a0-983d-5a46fdcc238c', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5),
                   ('338e1f47-6207-4924-a3e8-0745ddb42c15', 1.05, 1, 1, 1, 1.005, 1.005, 1, 1, 1, 1, 1, 1, 1, 3);
            INSERT INTO "Shop" (id, "priceMod")
            VALUES (1, 1);
            INSERT INTO "Structure" (id, name, description, type, "squareWorldId", "squareX", "squareY", "shopId")
            VALUES (1, 'Northwestern Goblin Camp', 'Home to the Frangobble clan, a bunch of goblins raiders who like to ambush unwary travellers.', 'monster-camp', 1, 2, 1, 1),
                   (2, 'Goblot''s tent', 'Goblot''s not in there. ', 'caravan', 1, 2, 1, null),
                   (3, 'Fort Leadber', 'fort_leadber.jpg', 'fort', 1, 8, 3, null);
            INSERT INTO "NonPlayerCharacter" (id, name, description, "squareWorldId", "squareX", "squareY", "shopId")
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
            WHERE id <= 3;
            DELETE
            FROM "Shop"
            WHERE id = 1;
            DELETE
            FROM "ItemRoll"
            WHERE
                  id = '23bb085b-7140-4eb5-8258-88a16c084c8a'
               OR id = 'ebd43941-cd61-49a0-983d-5a46fdcc238c'
               OR id = '338e1f47-6207-4924-a3e8-0745ddb42c15';
            DELETE
            FROM "Item"
            WHERE id <= 5;
            DELETE
            FROM "Encounter"
            WHERE id BETWEEN 2 AND 17;
            DELETE
            FROM "Monster"
            WHERE id BETWEEN 5 AND 9;
            DELETE
            FROM "MonsterType"
            WHERE id BETWEEN 4 AND 9;
		`);
	}
}
