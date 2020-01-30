import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {Repository} from "typeorm";
import {EncounterDropInfo, EncounterInfo} from "./encounter.dto";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";
import {SquareService} from "../square.service";
import {MonsterService} from "../../monster";
import {ModuleRef} from "@nestjs/core";

@Injectable()
export class EncounterService implements OnModuleInit {
	private squares!: SquareService;
	private monsters!: MonsterService;

	constructor(
		@Inject("ENCOUNTER_REPOSITORY")
		private readonly encounters: Repository<EncounterEntity>,
		@Inject("ENCOUNTER_DROP_REPOSITORY")
		private readonly drops: Repository<EncounterDropEntity>,
		private readonly refs: ModuleRef,
	) {
	}

	onModuleInit() {
		this.monsters = this.refs.get(MonsterService, {strict: false});
		this.squares = this.refs.get(SquareService, {strict: false});
	}

	async findAllDrops(): Promise<EncounterDropEntity[]> {
		return await this.drops.find();
	}

	async findOneDrop(id: number): Promise<EncounterDropEntity> {
		return await this.drops.findOneOrFail({where: {id}});
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

	async findAllEncounters(): Promise<EncounterEntity[]> {
		return await this.encounters.find();
	}

	async findOneEncounter(id: number): Promise<EncounterEntity> {
		return await this.encounters.findOneOrFail({where: {id}});
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
}
