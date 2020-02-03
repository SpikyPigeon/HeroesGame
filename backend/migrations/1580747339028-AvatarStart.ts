import {MigrationInterface, QueryRunner} from "typeorm";

export class AvatarStart1580747339028 implements MigrationInterface {
    public async up(runner: QueryRunner): Promise<any> {
        return await runner.query(`
            INSERT INTO "Avatar" (id, filename) VALUES 
                (1, 'Alchemist.png'),
                (2, 'Antipaladin.png'),
                (3, 'Arcanist.png'),
                (4, 'Assassin.png'),
                (5, 'Barbarian.png'),
                (6, 'Bard.png'),
                (7, 'Bloodrager.png'),
                (8, 'Brawler.png'),
                (9, 'Cavalier.png'),
                (10, 'Clark.png'),
                (11, 'Cleric.png'),
                (12, 'Conehead.png'),
                (13, 'corrin.png'),
                (14, 'Druid.png'),
                (15, 'dwarf.png'),
                (16, 'Fighter.png'),
                (17, 'green_huntress.jpg'),
                (18, 'Gunslinger.png'),
                (19, 'Hellknight.png'),
                (20, 'Hunter.png'),
                (21, 'Inquisitor.png'),
                (22, 'Investigator.png'),
                (23, 'Kineticist.png'),
                (24, 'knight.png'),
                (25, 'Magus.png'),
                (26, 'Medium.png'),
                (27, 'Mesmerist.png'),
                (28, 'Monk.png'),
                (29, 'Necromancer.png'),
                (30, 'Ninja.png'),
                (31, 'Occultist.png'),
                (32, 'Oracle.png'),
                (33, 'Paladin.png'),
                (34, 'Psychic.png'),
                (35, 'Ranger.png'),
                (36, 'Rogue.png'),
                (37, 'Samurai.png'),
                (38, 'Shaman.png'),
                (39, 'Shifter.png'),
                (40, 'Skald.png'),
                (41, 'Slayer.png'),
                (42, 'Sorcerer.png'),
                (43, 'Spiritualist.png'),
                (44, 'Swashbuckler.png'),
                (45, 'Torturer.png'),
                (46, 'Vigilante.png'),
                (47, 'Warpriest.png'),
                (48, 'Witch.png'),
                (49, 'Wizard.png'),
                (50, 'wizard_red.png');`);
    }

    public async down(runner: QueryRunner): Promise<any> {
        return await runner.query(`DELETE FROM "Avatar" WHERE id <= 50;`);
    }
}
