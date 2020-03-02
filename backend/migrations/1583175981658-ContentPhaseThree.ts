import {MigrationInterface, QueryRunner} from "typeorm";

export class ContentPhaseThree1583175981658 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO public."MonsterType" (id, name, description)
            VALUES (10, 'Avatar', 'An ethereal being, physical manifestation of a force of nature itself.'),
                   (11, 'Hydra', 'Some dragon with 1000 heads'),
                   (12, 'Griffon', 'A chimera: half-lion, half-eagle');
            INSERT INTO public."Monster" (id, name, description, level, strength, dexterity, vitality, intellect,
                                          picture, "typeId")
            VALUES (10, 'Orc Warrior',
                    'This is the common cast of orcs in the mountains. When not guarding their camp, they raid bypassers and other camps. They''re even bold enough to attack a village with enough numbers.',
                    12, 18, 18, 22, 15, 'orc-warrior.png', 2),
                   (11, 'Orc Barbarian',
                    'Bulkier, more savage variant of the orc warrior. Loves to crush heads with its giant axe.', 14, 20,
                    14, 26, 15, 'orc-barbarian.png', 2),
                   (12, 'Orc Berserker', 'This orc raider is the crazy kind, even for orcs!', 16, 22, 30, 20, 12,
                    'orc-charger.png', 2),
                   (13, 'Orc Captain',
                    'This is leader of its pack, more cunning than most of orcs - and thus more dangerous.', 17, 20, 24,
                    24, 18, 'orc-duelist.png', 2),
                   (14, 'Aggeris, Air''s Avatar',
                    'The embodiment of the Wind itself. It flies as gracefully as soft breeze, yet it fights with the fury of a hurricane.',
                    50, 100, 150, 150, 100, 'eagle_spirit.png', 10),
                   (15, 'Kumart, Lake''s Avatar', 'The embodiment of the lake itself.', 50, 75, 175, 125, 125,
                    'horse_avatar.png', 10),
                   (16, 'Reserion, Desert''s Bane', 'Rawr', 60, 150, 75, 200, 175, 'crystal-dragon.png', 8),
                   (17, 'Gorthar, Fire''s Avatar', 'FRRRMFF', 60, 200, 75, 175, 150, 'fire_avatar.png', 10),
                   (18, 'Waganto, Woods'' Avatar', 'The mighty guardian of the Clerwood Forest.', 75, 250, 80, 350, 70,
                    'forest_avatar.png', 10),
                   (19, 'Rhael''rath the Calamity', 'Most nightmarish resident of the jungle.', 60, 125, 100, 250, 125,
                    'green-hydra.png', 11),
                   (20, 'Mardur Griffon', 'An opportunist that hunts far from its nest to steal prey or loot.', 25, 50,
                    100, 70, 30, 'griffon.png', 12);
            INSERT INTO "Encounter" (id, "spawnChance", "minGold", "maxGold", "squareWorldId", "squareX", "squareY",
                                     "monsterId")
            VALUES (18, 0.03, 10000, 20000, 1, 18, 8, 14),
                   (19, 0.1, 200000, 400000, 1, 0, 0, 18);
            INSERT INTO public."ItemCategory" (id, "parentId", name, description)
            VALUES (24, 10, 'Cloak', 'Items that... cloak their user.'),
                   (25, 15, 'Shard', 'Unique items found on the Avatars. Grant great power.');
            INSERT INTO public."Item" (id, name, description, rarity, heal, "strengthMod", "dexterityMod",
                                       "vitalityMod", "intellectMod", "criticalChanceMod", "criticalDamageMod",
                                       "dodgeChanceMod", "healthMod", "manaMod", "armorMod", "damageMod", "itemDropMod",
                                       "goldDropMod", "inventorySpace", special, skill,
                                       "stackLimit", image, "categoryId")
            VALUES (7, 'Amber Cloak',
                    'This cloak of elvish making provides its wearer stealth, wisdom and better mana focus.',
                    'legendary', 0, 0, 5, 0, 5, 0, 0, 2, 0, 5, 5, 0, 0, 0, 0, null, null, 1, 'cloak_golden.png', 13),
                   (9, 'Protective Pendant',
                    'An old necklace with a titanium jewel. Grants damage resistance to its wearer.', 'rare', 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, null, null, 1, 'amulet_grey.png', 13),
                   (10, 'Sword of Sass', 'This sword ain''t messin'' around, boy!', 'unique', 0, 20, 20, 0, 0, 50, 50,
                    0, 0, 0, 0, 50, 0, 0, 0, null, null, 1, 'sassy.png', 16),
                   (11, 'Feather of Aggeris',
                    'A single, glowing feather from the gracious Avatar of Air, Aggeris. You can feel the power of the wind when you touch it.',
                    'unique', 0, 0, 75, 0, 50, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, null, null, 1, 'feather_blue.png', 25);
            INSERT INTO public."EncounterDrop" ("itemId", "encounterId", "dropChance", "minQuantity", "maxQuantity")
            VALUES (11, 18, 1, 1, 1);

            UPDATE "Square" SET image = 'forest_shrine_spawn.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 4;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 2;
            UPDATE "Square" SET image = 'camp_goblin_nw.png', icon = 'camp.png' WHERE "worldId" = 1 AND x = 2 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 0;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 5;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 5;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 6;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 8;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 8;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 9;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 10;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 5;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 5;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 6;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 6;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 9;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 6;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 7;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 0;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 2;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 2;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 3;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 4;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 4;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 1;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 1;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 2;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 4;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 7;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 7;
            UPDATE "Square" SET image = 'jungle_city.png', icon = 'castle1.png' WHERE "worldId" = 1 AND x = 5 AND y = 16;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 7;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 9;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 9;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 9;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 10;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 10;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 9;
            UPDATE "Square" SET image = 'village_river.png', icon = 'castle2.png' WHERE "worldId" = 1 AND x = 2 AND y = 7;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 9;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 10;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 10;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 10;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 11;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 11;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 11;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 11;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 12;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 12;
            UPDATE "Square" SET image = 'island_lake.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 12;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 13;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 13;
            UPDATE "Square" SET image = 'island_lake.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 13;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 14;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 14;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 15;
            UPDATE "Square" SET image = 'camp_pirate.png', icon = 'camp.png' WHERE "worldId" = 1 AND x = 9 AND y = 15;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 10;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 11;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 11;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 11;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 11;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 12;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 13;
            UPDATE "Square" SET image = null, icon = 'camp.png' WHERE "worldId" = 1 AND x = 1 AND y = 13;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 13;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 13;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 13;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 15;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 16;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 16;
            UPDATE "Square" SET image = 'jungle_stone.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 16;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 16;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 16;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 17;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 17;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 17;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 17;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 17;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 16;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 18;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 18;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 18;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 17;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 19;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 19;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 17;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 17;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 18;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 17;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 14;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 3;
            UPDATE "Square" SET image = 'fort_leadber.png', icon = 'castle1.png' WHERE "worldId" = 1 AND x = 8 AND y = 3;
            UPDATE "Square" SET image = 'clerwood_cave.png', icon = 'cave.png' WHERE "worldId" = 1 AND x = 5 AND y = 2;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 2;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 4;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 4;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 2;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 4;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 2;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 4;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 0;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 1;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 2;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 3;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 4;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 1;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 1;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 1;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 1;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 1;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 1;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 2;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 2;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 2;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 2;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 2;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 2;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 3;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 3;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 3;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 3;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 3;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 3;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 4;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 4;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 4;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 4;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 6;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 6;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 6;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 6;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 7;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 7;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 7;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 7;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 7;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 9;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 9;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 9;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 8;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 9;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 9;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 9;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 10;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 10;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 10;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 11;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 12;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 13;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 13;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 3;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 2;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 3;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 4;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 4;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 7;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 7;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 8;
            UPDATE "Square" SET image = 'mountain_shrine.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 8;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 8;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 9;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 12;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 12;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 12;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 12;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 12;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 13;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 13;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 13;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 13;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 11;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 12;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 12;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 13;
            UPDATE "Square" SET image = 'desert_river.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 15;
            UPDATE "Square" SET image = 'lake_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 14;
            UPDATE "Square" SET image = 'desert_river.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 14;
            UPDATE "Square" SET image = 'desert_river.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 13;
            UPDATE "Square" SET image = 'volcano_shrine.png', icon = 'cave.png' WHERE "worldId" = 1 AND x = 15 AND y = 11;
            UPDATE "Square" SET image = 'desert_city.png', icon = 'castle1.png' WHERE "worldId" = 1 AND x = 14 AND y = 15;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = 'cabin.png' WHERE "worldId" = 1 AND x = 2 AND y = 2;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 0;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 1;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 1;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 2;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 3;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 4;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 4;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 17;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 18;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 19;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 15;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 14;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 14;
            UPDATE "Square" SET image = 'nest_ant.png', icon = 'cave.png' WHERE "worldId" = 1 AND x = 16 AND y = 17;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 11;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 11;
            UPDATE "Square" SET image = 'camp_orc.png', icon = 'camp.png' WHERE "worldId" = 1 AND x = 16 AND y = 5;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 7;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 8;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 0 AND y = 9;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 7;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 8;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 9;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 5;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 6;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 7;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 8;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 7;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 8;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 9;
            UPDATE "Square" SET image = 'forest_clerwood.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 5;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 7;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 8;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 9;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 0;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 0;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 0;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 0;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 1;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 1;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 1;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 2;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 2;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 3;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 4;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 4;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 4;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 5;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 6;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 6;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 6;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 7;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 8;
            UPDATE "Square" SET image = 'mount_mardur.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 9;
            UPDATE "Square" SET image = 'mountain_snow.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 9;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 19 AND y = 13;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 3;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 6;
            UPDATE "Square" SET image = 'plain_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 7;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 8;
            UPDATE "Square" SET image = 'river_mountain.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 8;
            UPDATE "Square" SET image = 'waterfall_mountain.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 8;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 14 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 15 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 16 AND y = 10;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 17 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 11;
            UPDATE "Square" SET image = 'volcano.png', icon = null WHERE "worldId" = 1 AND x = 18 AND y = 12;
            UPDATE "Square" SET image = 'island_lake.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 13;
            UPDATE "Square" SET image = 'island_lake_city.png', icon = 'castle2.png' WHERE "worldId" = 1 AND x = 10 AND y = 12;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 1 AND y = 10;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 2 AND y = 10;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 3 AND y = 10;
            UPDATE "Square" SET image = 'river_forest.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 10;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 11;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 12;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 13;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 13;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 14;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 14;
            UPDATE "Square" SET image = 'jungle.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 15;
            UPDATE "Square" SET image = 'jungle_edge.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 15;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 16;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 16;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 17;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 17;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 17;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 10 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 12 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 11 AND y = 18;
            UPDATE "Square" SET image = 'village_desert.png', icon = 'castle1.png' WHERE "worldId" = 1 AND x = 13 AND y = 18;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 5 AND y = 18;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 4 AND y = 19;
            UPDATE "Square" SET image = 'swamp_shrine.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 18;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 6 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 7 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 19;
            UPDATE "Square" SET image = 'swamp.png', icon = null WHERE "worldId" = 1 AND x = 9 AND y = 19;
            UPDATE "Square" SET image = 'river_jungle.png', icon = null WHERE "worldId" = 1 AND x = 8 AND y = 16;
            UPDATE "Square" SET image = 'desert_A.png', icon = null WHERE "worldId" = 1 AND x = 13 AND y = 15;
            UPDATE "Square" SET image = 'plain_A.png', icon = 'camp.png' WHERE "worldId" = 1 AND x = 9 AND y = 7;

			DELETE FROM "Structure" WHERE id = 2;
			UPDATE "Structure" SET id = 2 WHERE name = 'Clerwood Cave';
		`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE
            FROM "EncounterDrop"
            WHERE "itemId" = 11;
            DELETE
            FROM "Item"
            WHERE id >= 7;
            DELETE
            FROM "ItemCategory"
            WHERE id >= 24;
            DELETE
            FROM "Encounter"
            WHERE id >= 18;
            DELETE
            FROM "Monster"
            WHERE id >= 10;
            DELETE
            FROM "MonsterType"
            WHERE id >= 10;
		`);
	}
}
