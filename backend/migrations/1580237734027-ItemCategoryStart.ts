import {MigrationInterface, QueryRunner} from "typeorm";

export class ItemCategoryStart1580237734027 implements MigrationInterface {
    public async up(runner: QueryRunner): Promise<any> {
        return await runner.query(`INSERT INTO "ItemCategory" (id, name, description, "parentId") VALUES
(1, 'Consumable', 'Items that are consumed after use', null),
(2, 'Potion', 'Items that can be drank to provide their effects', 1),
(3, 'Scroll', 'Items that can be read to provide their effects', 1),
(4, 'Rune', 'Items that can be broken to provide their effects', 1),
(5, 'Equipment', 'Items that can be equipped on a Character', null),
(6, 'Weapon', 'Items that can be equipped on a Character to deal damage', 5),
(7, 'Shield', 'Items that can be equipped on a Character to deal damage', 5),
(8, 'Head Piece', 'Items that can be equipped on a Character to deal damage', 5),
(9, 'Chest Piece', 'Items that can be equipped on a Character to deal damage', 5),
(10, 'Belt Piece', 'Items that can be equipped on a Character to deal damage', 5),
(11, 'Foot Piece', 'Items that can be equipped on a Character to deal damage', 5),
(12, 'Ring', 'Items that can be equipped on a Character to deal damage', 5),
(13, 'Necklace', 'Items that can be equipped on a Character to deal damage', 5),
(14, 'Bag', 'Items that can be equipped on a Character to deal damage', 5),
(15, 'Artifact', 'Items that can be equipped on a Character to deal damage', 5),
(16, 'Sword', 'Items that can be equipped on a Character to deal slashing damage', 6),
(17, 'Dagger', 'Items that can be equipped on a Character to deal slashing damage', 6),
(18, 'Mace', 'Items that can be equipped on a Character to deal slashing damage', 6),
(19, 'Spear', 'Items that can be equipped on a Character to deal slashing damage', 6),
(20, 'Bow', 'Items that can be equipped on a Character to deal slashing damage', 6),
(21, 'Glove', 'Items that can be equipped on a Character to deal bludgeoning damage', 6),
(22, 'Food', 'Items that can be eaten for sustenance and other beneficial effects, such as living.', 1);`);
    }

    public async down(runner: QueryRunner): Promise<any> {
        return await runner.query(`DELETE FROM "ItemCategory" WHERE id <= 20;`);
    }
}
