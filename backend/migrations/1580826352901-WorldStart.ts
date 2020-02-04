import {MigrationInterface, QueryRunner} from "typeorm";

export class WorldStart1580826352901 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "World" (id, name, "limitX", "limitY", color, "bgImage")
            VALUES (1, 'Contigo', 20, 20, '#009900', '');
            INSERT INTO "Square" ("worldId", x, y, image)
            VALUES (1, 0, 0, ''), (1, 0, 1, ''), (1, 0, 2, ''), (1, 0, 3, ''), (1, 0, 4, ''),
                   (1, 0, 5, ''), (1, 0, 6, ''), (1, 0, 7, ''), (1, 0, 8, ''), (1, 0, 9, ''),
                   (1, 0, 10, ''), (1, 0, 11, ''), (1, 0, 12, ''), (1, 0, 13, ''), (1, 0, 14, ''),
                   (1, 0, 15, ''), (1, 0, 16, ''), (1, 0, 17, ''), (1, 0, 18, ''), (1, 0, 19, ''),
                   (1, 1, 0, ''), (1, 1, 1, ''), (1, 1, 2, ''), (1, 1, 3, ''), (1, 1, 4, ''),
                   (1, 1, 5, ''), (1, 1, 6, ''), (1, 1, 7, ''), (1, 1, 8, ''), (1, 1, 9, ''),
                   (1, 1, 10, ''), (1, 1, 11, ''), (1, 1, 12, ''), (1, 1, 13, ''), (1, 1, 14, ''),
                   (1, 1, 15, ''), (1, 1, 16, ''), (1, 1, 17, ''), (1, 1, 18, ''), (1, 1, 19, ''),
                   (1, 2, 0, ''), (1, 2, 1, ''), (1, 2, 2, ''), (1, 2, 3, ''), (1, 2, 4, ''),
                   (1, 2, 5, ''), (1, 2, 6, ''), (1, 2, 7, ''), (1, 2, 8, ''), (1, 2, 9, ''),
                   (1, 2, 10, ''), (1, 2, 11, ''), (1, 2, 12, ''), (1, 2, 13, ''), (1, 2, 14, ''),
                   (1, 2, 15, ''), (1, 2, 16, ''), (1, 2, 17, ''), (1, 2, 18, ''), (1, 2, 19, ''),
                   (1, 3, 0, ''), (1, 3, 1, ''), (1, 3, 2, ''), (1, 3, 3, ''), (1, 3, 4, ''),
                   (1, 3, 5, ''), (1, 3, 6, ''), (1, 3, 7, ''), (1, 3, 8, ''), (1, 3, 9, ''),
                   (1, 3, 10, ''), (1, 3, 11, ''), (1, 3, 12, ''), (1, 3, 13, ''), (1, 3, 14, ''),
                   (1, 3, 15, ''), (1, 3, 16, ''), (1, 3, 17, ''), (1, 3, 18, ''), (1, 3, 19, ''),
                   (1, 4, 0, ''), (1, 4, 1, ''), (1, 4, 2, ''), (1, 4, 3, ''), (1, 4, 4, ''),
                   (1, 4, 5, ''), (1, 4, 6, ''), (1, 4, 7, ''), (1, 4, 8, ''), (1, 4, 9, ''),
                   (1, 4, 10, ''), (1, 4, 11, ''), (1, 4, 12, ''), (1, 4, 13, ''), (1, 4, 14, ''),
                   (1, 4, 15, ''), (1, 4, 16, ''), (1, 4, 17, ''), (1, 4, 18, ''), (1, 4, 19, ''),
                   (1, 5, 0, ''), (1, 5, 1, ''), (1, 5, 2, ''), (1, 5, 3, ''), (1, 5, 4, ''),
                   (1, 5, 5, ''), (1, 5, 6, ''), (1, 5, 7, ''), (1, 5, 8, ''), (1, 5, 9, ''),
                   (1, 5, 10, ''), (1, 5, 11, ''), (1, 5, 12, ''), (1, 5, 13, ''), (1, 5, 14, ''),
                   (1, 5, 15, ''), (1, 5, 16, ''), (1, 5, 17, ''), (1, 5, 18, ''), (1, 5, 19, ''),
                   (1, 6, 0, ''), (1, 6, 1, ''), (1, 6, 2, ''), (1, 6, 3, ''), (1, 6, 4, ''),
                   (1, 6, 5, ''), (1, 6, 6, ''), (1, 6, 7, ''), (1, 6, 8, ''), (1, 6, 9, ''),
                   (1, 6, 10, ''), (1, 6, 11, ''), (1, 6, 12, ''), (1, 6, 13, ''), (1, 6, 14, ''),
                   (1, 6, 15, ''), (1, 6, 16, ''), (1, 6, 17, ''), (1, 6, 18, ''), (1, 6, 19, ''),
                   (1, 7, 0, ''), (1, 7, 1, ''), (1, 7, 2, ''), (1, 7, 3, ''), (1, 7, 4, ''),
                   (1, 7, 5, ''), (1, 7, 6, ''), (1, 7, 7, ''), (1, 7, 8, ''), (1, 7, 9, ''),
                   (1, 7, 10, ''), (1, 7, 11, ''), (1, 7, 12, ''), (1, 7, 13, ''), (1, 7, 14, ''),
                   (1, 7, 15, ''), (1, 7, 16, ''), (1, 7, 17, ''), (1, 7, 18, ''), (1, 7, 19, ''),
                   (1, 8, 0, ''), (1, 8, 1, ''), (1, 8, 2, ''), (1, 8, 3, ''), (1, 8, 4, ''),
                   (1, 8, 5, ''), (1, 8, 6, ''), (1, 8, 7, ''), (1, 8, 8, ''), (1, 8, 9, ''),
                   (1, 8, 10, ''), (1, 8, 11, ''), (1, 8, 12, ''), (1, 8, 13, ''), (1, 8, 14, ''),
                   (1, 8, 15, ''), (1, 8, 16, ''), (1, 8, 17, ''), (1, 8, 18, ''), (1, 8, 19, ''),
                   (1, 9, 0, ''), (1, 9, 1, ''), (1, 9, 2, ''), (1, 9, 3, ''), (1, 9, 4, ''),
                   (1, 9, 5, ''), (1, 9, 6, ''), (1, 9, 7, ''), (1, 9, 8, ''), (1, 9, 9, ''),
                   (1, 9, 10, ''), (1, 9, 11, ''), (1, 9, 12, ''), (1, 9, 13, ''), (1, 9, 14, ''),
                   (1, 9, 15, ''), (1, 9, 16, ''), (1, 9, 17, ''), (1, 9, 18, ''), (1, 9, 19, ''),
                   (1, 10, 0, ''), (1, 10, 1, ''), (1, 10, 2, ''), (1, 10, 3, ''), (1, 10, 4, ''),
                   (1, 10, 5, ''), (1, 10, 6, ''), (1, 10, 7, ''), (1, 10, 8, ''), (1, 10, 9, ''),
                   (1, 10, 10, ''), (1, 10, 11, ''), (1, 10, 12, ''), (1, 10, 13, ''), (1, 10, 14, ''),
                   (1, 10, 15, ''), (1, 10, 16, ''), (1, 10, 17, ''), (1, 10, 18, ''), (1, 10, 19, ''),
                   (1, 11, 0, ''), (1, 11, 1, ''), (1, 11, 2, ''), (1, 11, 3, ''), (1, 11, 4, ''),
                   (1, 11, 5, ''), (1, 11, 6, ''), (1, 11, 7, ''), (1, 11, 8, ''), (1, 11, 9, ''),
                   (1, 11, 10, ''), (1, 11, 11, ''), (1, 11, 12, ''), (1, 11, 13, ''), (1, 11, 14, ''),
                   (1, 11, 15, ''), (1, 11, 16, ''), (1, 11, 17, ''), (1, 11, 18, ''), (1, 11, 19, ''),
                   (1, 12, 0, ''), (1, 12, 1, ''), (1, 12, 2, ''), (1, 12, 3, ''), (1, 12, 4, ''),
                   (1, 12, 5, ''), (1, 12, 6, ''), (1, 12, 7, ''), (1, 12, 8, ''), (1, 12, 9, ''),
                   (1, 12, 10, ''), (1, 12, 11, ''), (1, 12, 12, ''), (1, 12, 13, ''), (1, 12, 14, ''),
                   (1, 12, 15, ''), (1, 12, 16, ''), (1, 12, 17, ''), (1, 12, 18, ''), (1, 12, 19, ''),
                   (1, 13, 0, ''), (1, 13, 1, ''), (1, 13, 2, ''), (1, 13, 3, ''), (1, 13, 4, ''),
                   (1, 13, 5, ''), (1, 13, 6, ''), (1, 13, 7, ''), (1, 13, 8, ''), (1, 13, 9, ''),
                   (1, 13, 10, ''), (1, 13, 11, ''), (1, 13, 12, ''), (1, 13, 13, ''), (1, 13, 14, ''),
                   (1, 13, 15, ''), (1, 13, 16, ''), (1, 13, 17, ''), (1, 13, 18, ''), (1, 13, 19, ''),
                   (1, 14, 0, ''), (1, 14, 1, ''), (1, 14, 2, ''), (1, 14, 3, ''), (1, 14, 4, ''),
                   (1, 14, 5, ''), (1, 14, 6, ''), (1, 14, 7, ''), (1, 14, 8, ''), (1, 14, 9, ''),
                   (1, 14, 10, ''), (1, 14, 11, ''), (1, 14, 12, ''), (1, 14, 13, ''), (1, 14, 14, ''),
                   (1, 14, 15, ''), (1, 14, 16, ''), (1, 14, 17, ''), (1, 14, 18, ''), (1, 14, 19, ''),
                   (1, 15, 0, ''), (1, 15, 1, ''), (1, 15, 2, ''), (1, 15, 3, ''), (1, 15, 4, ''),
                   (1, 15, 5, ''), (1, 15, 6, ''), (1, 15, 7, ''), (1, 15, 8, ''), (1, 15, 9, ''),
                   (1, 15, 10, ''), (1, 15, 11, ''), (1, 15, 12, ''), (1, 15, 13, ''), (1, 15, 14, ''),
                   (1, 15, 15, ''), (1, 15, 16, ''), (1, 15, 17, ''), (1, 15, 18, ''), (1, 15, 19, ''),
                   (1, 16, 0, ''), (1, 16, 1, ''), (1, 16, 2, ''), (1, 16, 3, ''), (1, 16, 4, ''),
                   (1, 16, 5, ''), (1, 16, 6, ''), (1, 16, 7, ''), (1, 16, 8, ''), (1, 16, 9, ''),
                   (1, 16, 10, ''), (1, 16, 11, ''), (1, 16, 12, ''), (1, 16, 13, ''), (1, 16, 14, ''),
                   (1, 16, 15, ''), (1, 16, 16, ''), (1, 16, 17, ''), (1, 16, 18, ''), (1, 16, 19, ''),
                   (1, 17, 0, ''), (1, 17, 1, ''), (1, 17, 2, ''), (1, 17, 3, ''), (1, 17, 4, ''),
                   (1, 17, 5, ''), (1, 17, 6, ''), (1, 17, 7, ''), (1, 17, 8, ''), (1, 17, 9, ''),
                   (1, 17, 10, ''), (1, 17, 11, ''), (1, 17, 12, ''), (1, 17, 13, ''), (1, 17, 14, ''),
                   (1, 17, 15, ''), (1, 17, 16, ''), (1, 17, 17, ''), (1, 17, 18, ''), (1, 17, 19, ''),
                   (1, 18, 0, ''), (1, 18, 1, ''), (1, 18, 2, ''), (1, 18, 3, ''), (1, 18, 4, ''),
                   (1, 18, 5, ''), (1, 18, 6, ''), (1, 18, 7, ''), (1, 18, 8, ''), (1, 18, 9, ''),
                   (1, 18, 10, ''), (1, 18, 11, ''), (1, 18, 12, ''), (1, 18, 13, ''), (1, 18, 14, ''),
                   (1, 18, 15, ''), (1, 18, 16, ''), (1, 18, 17, ''), (1, 18, 18, ''), (1, 18, 19, ''),
                   (1, 19, 0, ''), (1, 19, 1, ''), (1, 19, 2, ''), (1, 19, 3, ''), (1, 19, 4, ''),
                   (1, 19, 5, ''), (1, 19, 6, ''), (1, 19, 7, ''), (1, 19, 8, ''), (1, 19, 9, ''),
                   (1, 19, 10, ''), (1, 19, 11, ''), (1, 19, 12, ''), (1, 19, 13, ''), (1, 19, 14, ''),
                   (1, 19, 15, ''), (1, 19, 16, ''), (1, 19, 17, ''), (1, 19, 18, ''), (1, 19, 19, '');`)
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            DELETE
            FROM "Square"
            WHERE "worldId" = 1;
            DELETE
            FROM "World"
            WHERE "id" = 1;`);
	}
}
