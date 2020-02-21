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
	private items!: ItemService;

	constructor(
		@Inject("ENCOUNTER_REPOSITORY")
		private readonly encounters: Repository<EncounterEntity>,
		@Inject("ENCOUNTER_DROP_REPOSITORY")
		private readonly drops: Repository<EncounterDropEntity>,
		private readonly squares: SquareService,
		private readonly refs: ModuleRef,
	) {
	}

	onModuleInit() {
		this.monsters = this.refs.get(MonsterService, {strict: false});
		this.items = this.refs.get(ItemService, {strict: false});
	}

	async findAllDrops(): Promise<EncounterDropEntity[]> {
		return await this.drops.find({
			relations: [
				"item",
				"item.category",
				"item.category.parent",
				"item.category.parent.parent",
			],
		});
	}

	async findOneDrop(id: number): Promise<EncounterDropEntity> {
		return await this.drops.findOneOrFail({
			where: {id},
			relations: [
				"item",
				"item.category",
				"item.category.parent",
				"item.category.parent.parent",
			],
		});
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
		return await this.createQuery().getMany();
	}

	async findAllAtLocation(worldId: number, x: number, y: number): Promise<Array<EncounterEntity>> {
		return await this.createQuery()
			.where("world.id = :worldId AND square.x = :x AND square.y = :y", {worldId, x, y})
			.getMany();
	}

	async findOneEncounter(id: number): Promise<EncounterEntity> {
		const enc = await this.createQuery()
			.where("enc.id = :id", {id})
			.getOne();

		if (enc) {
			return enc;
		} else {
			throw new Error(`Encouter #${id} not found`);
		}
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
		const {worldId, x, y, monsterId, ...info} = newEncounter;
		const encounter = {...await this.findOneEncounter(id), ...info};
		if (newEncounter.worldId && newEncounter.x && newEncounter.y) {
			encounter.square = await this.squares.findOne(newEncounter.worldId, newEncounter.x, newEncounter.y);
		}
		if (newEncounter.monsterId) {
			encounter.monster = await this.monsters.findOneMonster(newEncounter.monsterId);
		}
		return await this.encounters.save(encounter);
	}

	private createQuery() {
		return this.encounters.createQueryBuilder("enc")
			.leftJoinAndSelect("enc.square", "square")
			.leftJoinAndSelect("square.world", "world")
			.leftJoinAndSelect("enc.monster", "mon")
			.leftJoinAndSelect("mon.type", "monType")
			.leftJoinAndSelect("enc.drops", "drop")
			.leftJoinAndSelect("drop.item", "item")
			.leftJoinAndSelect("item.category", "cat")
			.leftJoinAndSelect("cat.parent", "parent1")
			.leftJoinAndSelect("parent1.parent", "parent2");
	}
}
