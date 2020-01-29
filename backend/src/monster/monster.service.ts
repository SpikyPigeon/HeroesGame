import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MonsterInfo, MonsterTypeInfo} from "./monster.dto";
import {MonsterTypeEntity} from "./monster-type.entity";
import {MonsterEntity} from "./monster.entity";

@Injectable()
export class MonsterService {
	constructor(
		@Inject("MONSTER_REPOSITORY")
		private readonly monsters: Repository<MonsterEntity>,
		@Inject("MONSTER_TYPE_REPOSITORY")
		private readonly types: Repository<MonsterTypeEntity>,
	) {
	}

	async findAllTypes(): Promise<MonsterTypeEntity[]> {
		return await this.types.find();
	}

	async findOneType(id: number): Promise<MonsterTypeEntity> {
		return await this.types.findOneOrFail({where: {id}});
	}

	async createType(name: string, description: string): Promise<MonsterTypeEntity> {
		return await this.types.save(this.types.create({
			name,
			description,
		}));
	}

	async updateType(id: number, newType: Partial<MonsterTypeInfo>): Promise<MonsterTypeEntity> {
		const type = {...await this.findOneType(id), ...newType};
		return await this.types.save(type);
	}

	async findAllMonsters(): Promise<MonsterEntity[]> {
		return await this.monsters.find();
	}

	async findOneMonster(id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneOrFail({where: {id}});
	}

	async createMonster(data: MonsterInfo): Promise<MonsterEntity> {
		const {typeId, ...info} = data;
		return await this.monsters.save(this.monsters.create({
			type: await this.findOneType(typeId),
			...info
		}));
	}

	async updateMonster(id: number, newMonster: Partial<MonsterInfo>): Promise<MonsterEntity> {
		const {typeId, ...info} = newMonster;
		const monster = {...await this.findOneMonster(id), ...info};

		if (typeId) {
			monster.type = await this.findOneType(typeId);
		}

		return await this.monsters.save(monster);
	}
}
