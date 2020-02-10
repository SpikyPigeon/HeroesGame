import {MigrationInterface, QueryRunner} from "typeorm";

export class MonsterStart1581098390248 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "MonsterType" (id, name, description)
            VALUES (1, 'Goblin',
                    'This creature stands barely three feet tall, its scrawny, humanoid body dwarfed by its wide, ungainly head.'),
                   (2, 'Orc',
                    'This savage creature looks like a bestial version of a savage human, with green-gray skin and greasy black air.'),
                   (3, 'Ooze',
                    'This creature''s body is composed primarily of fluids and, as such, is mindless and voracious.');
            INSERT INTO "Monster" (id, name, description, level, strength, dexterity, vitality, intellect, picture, "typeId")
            VALUES (1, 'Weak Slime', 'This is the weakest Ooze that roams the world.',
                    1, 5, 3, 7, 0, 'slime.png', 3),
                   (2, 'Goblin Warrior', 'They are the most common Goblins, and adventurers must be careful for they tend to travel in groups.',
                    3, 8, 12, 9, 5, 'goblin-warrior.png', 1),
                   (3, 'Goblin Archer', 'They are the second most common Goblins, and lead small raiding bands in endless search for food.',
                    5, 9, 18, 13, 7, 'goblin-archer.png', 1),
                   (4, 'Goblin Bomber', 'They are the most intelligent of Goblins, as they learned to harness the power of black powder. Do not underestimate.',
                    8, 15, 13, 17, 9, 'goblin-bomber.png', 1);
            INSERT INTO "Encounter" ("id", "spawnChance", "minGold", "maxGold", "squareWorldId", "squareX", "squareY", "monsterId")
            VALUES (1, 0.75, 2, 5, 1, 0, 0, 1);`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE
            FROM "Encounter"
            WHERE id <= 1;
            DELETE
            FROM "Monster"
            WHERE id <= 4;
            DELETE
            FROM "MonsterType"
            WHERE id <= 3;`);
	}
}
