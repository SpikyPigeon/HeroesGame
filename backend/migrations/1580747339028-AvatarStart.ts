import {MigrationInterface, QueryRunner} from "typeorm";

export class AvatarStart1580747339028 implements MigrationInterface {
	public async up(runner: QueryRunner): Promise<any> {
		return await runner.query(`
            INSERT INTO "Avatar" (id, filename)
            VALUES (1, 'Alchemist.png'),
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
                   (13, 'Druid.png'),
                   (14, 'dwarf.png'),
                   (15, 'Fighter.png'),
                   (16, 'Gunslinger.png'),
                   (17, 'Hellknight.png'),
                   (18, 'Hunter.png'),
                   (19, 'Inquisitor.png'),
                   (20, 'Investigator.png'),
                   (21, 'Kineticist.png'),
                   (22, 'knight.png'),
                   (23, 'Magus.png'),
                   (24, 'Medium.png'),
                   (25, 'Mesmerist.png'),
                   (26, 'Monk.png'),
                   (27, 'Necromancer.png'),
                   (28, 'Ninja.png'),
                   (29, 'Occultist.png'),
                   (30, 'Oracle.png'),
                   (31, 'Paladin.png'),
                   (32, 'Psychic.png'),
                   (33, 'Ranger.png'),
                   (34, 'Rogue.png'),
                   (35, 'Samurai.png'),
                   (36, 'Shaman.png'),
                   (37, 'Shifter.png'),
                   (38, 'Skald.png'),
                   (39, 'Slayer.png'),
                   (40, 'Sorcerer.png'),
                   (41, 'Spiritualist.png'),
                   (42, 'Swashbuckler.png'),
                   (43, 'Torturer.png'),
                   (44, 'Vigilante.png'),
                   (45, 'Warpriest.png'),
                   (46, 'Witch.png'),
                   (47, 'Wizard.png'),
                   (48, 'wizard_red.png');`);
	}

	public async down(runner: QueryRunner): Promise<any> {
		return await runner.query(`DELETE
                                   FROM "Avatar"
                                   WHERE id <= 48;`);
	}
}
