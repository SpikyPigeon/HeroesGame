import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";
import {SquareService} from "../square.service";
import {MonsterService} from "../../monster";

export interface EncounterInfo {
	worldId: number,
	x: number,
	y: number,
	monsterId: number,
	spawnChance: number,
	minGold: number,
	maxGold: number,
}

export interface EncounterDropInfo {
	itemId: number,
	encounterId: number,
	dropChance: number,
	minQuantity: number,
	maxQuantity: number,
}

@Injectable()
export class EncounterService {
	constructor(
		@Inject("ENCOUNTER_REPOSITORY")
		private readonly encounters: Repository<EncounterEntity>,
		@Inject("ENCOUNTER_DROP_REPOSITORY")
		private readonly drops: Repository<EncounterDropEntity>,
		private readonly squares: SquareService,
		private readonly monsters: MonsterService,
	) {
	}

	async createEncounter(data: EncounterInfo): Promise<EncounterEntity> {
		const encounter = await this.encounters.save(this.encounters.create({
			square: await this.squares.findOne(data.worldId, data.x, data.y),
			monster: await this.monsters.findOneMonster(data.monsterId),
			spawnChance: data.spawnChance,
			minGold: data.minGold,
			maxGold: data.maxGold,
		}));
		await this.encounters.save(encounter);
		return encounter;
	}

	async createDrop(data: EncounterDropInfo): Promise<EncounterDropEntity> {
		const drop = await this.drops.save(this.drops.create({
			itemId: data.itemId,
			encounterId: data.encounterId,
			dropChance: data.dropChance,
			minQuantity: data.minQuantity,
			maxQuantity: data.maxQuantity,
		}));
		await this.drops.save(drop);
		return drop;
	}

	async findAllEncounters(): Promise<EncounterEntity[]> {
		return await this.encounters.find();
	}

	async findAllDrops(): Promise<EncounterDropEntity[]> {
		return await this.drops.find();
	}

	async findOneEncounter(id: number): Promise<EncounterEntity> {
		return await this.encounters.findOneOrFail({where: {id}});
	}

	async findOneDrop(id: number): Promise<EncounterDropEntity> {
		return await this.drops.findOneOrFail({where: {id}});
	}

	async updateEncounter(id: number, newEncounter: Partial<EncounterInfo>): Promise<EncounterEntity> {
		const encounter = await this.findOneEncounter(id);
		if (newEncounter.worldId && newEncounter.x && newEncounter.y) {
			encounter.square = await this.squares.findOne(newEncounter.worldId, newEncounter.x, newEncounter.y);
		}
		if (newEncounter.monsterId) {
			encounter.monster = await this.monsters.findOneMonster(newEncounter.monsterId);
		}
		if (newEncounter.spawnChance) {
			encounter.spawnChance = newEncounter.spawnChance;
		}
		if (newEncounter.minGold) {
			encounter.minGold = newEncounter.minGold;
		}
		if (newEncounter.maxGold) {
			encounter.maxGold = newEncounter.maxGold;
		}
		return await this.encounters.save(encounter);
	}

	async updateDrop(id: number, newDrop: Partial<EncounterDropInfo>): Promise<EncounterDropEntity> {
		const drop = await this.findOneDrop(id);
		if(newDrop.dropChance){
			drop.dropChance = newDrop.dropChance;
		}
		if(newDrop.minQuantity){
			drop.minQuantity = newDrop.minQuantity;
		}
		if(newDrop.maxQuantity){
			drop.maxQuantity = newDrop.maxQuantity;
		}
		return await this.drops.save(drop);
	}
}
