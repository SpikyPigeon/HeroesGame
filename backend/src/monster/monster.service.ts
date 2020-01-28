import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterEntity} from "./monster.entity";

interface MonsterInfo {
	name: string,
	description: string,
	type: MonsterTypeEntity,
	level: number,
	strength: number,
	dexterity: number,
	vitality: number,
	intellect: number,
	picture: string,
}

@Injectable()
export class MonsterService {
	constructor(
		@Inject("MONSTER_REPOSITORY")
		private readonly monsters: Repository<MonsterEntity>,
		@Inject("MONSTER_TYPE_REPOSITORY")
		private readonly types: Repository<MonsterTypeEntity>,
	) {
	}

	async create(data: MonsterInfo): Promise<MonsterEntity> {
		return await this.monsters.save(this.monsters.create({...data}));
	}

	async findAll(): Promise<MonsterEntity[]> {
		return await this.monsters.find();
	}

	async findOne(id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneOrFail({where: {id}});
	}

	async update(id: number, newMonster: Partial<MonsterInfo>): Promise<MonsterEntity> {
		const monster = await this.findOne(id);
		if (newMonster.name) {
			monster.name = newMonster.name;
		}
		if (newMonster.description) {
			monster.description = newMonster.description;
		}
		if (newMonster.type) {
			monster.type = newMonster.type;
		}
		if (newMonster.level) {
			monster.level = newMonster.level;
		}
		if (newMonster.strength) {
			monster.strength = newMonster.strength;
		}
		if (newMonster.dexterity) {
			monster.dexterity = newMonster.dexterity;
		}
		if (newMonster.vitality) {
			monster.vitality = newMonster.vitality;
		}
		if (newMonster.intellect) {
			monster.intellect = newMonster.intellect;
		}
		if (newMonster.picture) {
			monster.picture = newMonster.picture;
		}
		return await this.monsters.save(monster);
	}

}
