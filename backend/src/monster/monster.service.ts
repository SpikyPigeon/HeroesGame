import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MonsterInfoDto, MonsterTypeInfoDto} from "./monster.dto";
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

	async findAllTypes(): Promise<Array<MonsterTypeEntity>> {
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

	async updateType(id: number, newType: Partial<MonsterTypeInfoDto>): Promise<MonsterTypeEntity> {
		const type = {...await this.findOneType(id), ...newType};
		return await this.types.save(type);
	}

	async findAllMonsters(): Promise<Array<MonsterEntity>> {
		return await this.monsters.find({relations: ["type"]});
	}

	async findOneMonster(id: number): Promise<MonsterEntity> {
		return await this.monsters.findOneOrFail({where: {id}, relations: ["type"]});
	}

	async createMonster(data: MonsterInfoDto): Promise<MonsterEntity> {
		const {typeId, ...info} = data;
		return await this.monsters.save(this.monsters.create({
			type: await this.findOneType(typeId),
			...info
		}));
	}

	async updateMonster(id: number, newMonster: Partial<MonsterInfoDto>): Promise<MonsterEntity> {
		const {typeId, ...info} = newMonster;
		const monster = {...await this.findOneMonster(id), ...info};

		if (typeId) {
			monster.type = await this.findOneType(typeId);
		}

		return await this.monsters.save(monster);
	}
}
