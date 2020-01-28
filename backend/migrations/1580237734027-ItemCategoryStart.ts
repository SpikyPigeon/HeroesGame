import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemCategoryStart1580237734027 implements MigrationInterface {
    public async up(runner: QueryRunner): Promise<any> {
        return await runner.query(`INSERT INTO "ItemCategory" (id, name, description, "parentId") VALUES
(1, 'Consumables', 'Items that are consumed after use', null),
(2, 'Potions', 'Items that can be drank to provide their effects', 1),
(3, 'Equipment', 'Items that can be equipped on a Character', null),
(4, 'Weapons', 'Items that can be equipped on a Character to deal damage', 3),
(5, 'Swords', 'Items that can be equipped on a Character to deal slashing damage', 4);`);
    }

    public async down(runner: QueryRunner): Promise<any> {
        return await runner.query(`DELETE FROM "ItemCategory" WHERE id <= 5;`);
    }
}
