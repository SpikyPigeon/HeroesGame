import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterEntity} from "./monster.entity";

export interface MonsterInfo {
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

export interface TypeInfo{
	name: string,
	description: string,
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

	//CREATE Section
	async createMonster(data: MonsterInfo): Promise<MonsterEntity> {
		return await this.monsters.save(this.monsters.create({...data}));
	}

	async createType(name: string, description: string): Promise<MonsterTypeEntity>{
		const type = await this.types.save(this.types.create({
			name,
			description,
		}));
		await this.types.create(type);
		return type;
	}

	//FIND ALL Section
	async findAllMonsters(): Promise<MonsterEntity[]> {
		return await this.monsters.find();
	}

	async findAllTypes(): Promise<MonsterTypeEntity[]>{
		return await this.types.find();
	}

	//FIND ONE Section
	async findOneMonster(id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneOrFail({where: {id}});
	}

	async findOneType(id: number): Promise<MonsterTypeEntity>{
		return await this.types.findOneOrFail({where: {id}});
	}

	//UPDATE Section
	async updateMonster(id: number, newMonster: Partial<MonsterInfo>): Promise<MonsterEntity> {
		const monster = await this.findOneMonster(id);
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

	async updateType(id: number, newType: Partial<TypeInfo>): Promise<MonsterTypeEntity>{
		const type = await this.findOneType(id);
		if(newType.name){
			type.name = newType.name;
		}
		if(newType.description){
			type.description = newType.description;
		}
		return await this.types.save(type);
	}


}
