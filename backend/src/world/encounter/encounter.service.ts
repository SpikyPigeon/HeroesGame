import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {Repository} from "typeorm";
import {CreateDropInfo, EncounterInfo, UpdateDropInfo} from "./encounter.dto";
import {EncounterDropEntity} from "./encounter-drop.entity";
import {EncounterEntity} from "./encounter.entity";
import {SquareService} from "../square.service";
import {MonsterService} from "../../monster";
import {ItemService} from "../../item";

@Injectable()
export class EncounterService implements OnModuleInit {
	private monsters!: MonsterService;
	private squares!: SquareService;
	private items!: ItemService;

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
		this.items = this.refs.get(ItemService, {strict: false});
	}

	async findAllDrops(): Promise<EncounterDropEntity[]> {
		return await this.drops.find({relations: ["item"]});
	}

	async findOneDrop(id: number): Promise<EncounterDropEntity> {
		return await this.drops.findOneOrFail({where: {id}, relations: ["item"]});
	}

	async createDrop(data: CreateDropInfo): Promise<EncounterDropEntity> {
		return await this.drops.save(this.drops.create({
			item: await this.items.findOneItem(data.itemId),
			encounter: await this.findOneEncounter(data.encounterId),
			minQuantity: data.minQuantity,
			maxQuantity: data.maxQuantity,
			dropChance: data.dropChance,
		}));
	}

	async updateDrop(id: number, newDrop: Partial<UpdateDropInfo>): Promise<EncounterDropEntity> {
		const drop = {...await this.findOneDrop(id), ...newDrop};
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
