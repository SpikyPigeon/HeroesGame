import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {Repository} from "typeorm";
import {InventoryEntity} from "./inventory.entity";
import {RollService} from "../../item";
import {CharacterService} from "../character.service";
import {ModuleRef} from "@nestjs/core";

@Injectable()
export class InventoryService implements OnModuleInit {
	private rolls!: RollService;
	private characters!: CharacterService;

	constructor(
		@Inject("INVENTORY_REPOSITORY")
		private readonly inventories: Repository<InventoryEntity>,
		private readonly refs: ModuleRef
	) {
	}

	onModuleInit() {
		this.characters = this.refs.get(CharacterService, {strict: false});
		this.rolls = this.refs.get(RollService, {strict: false});
	}

	async create(rollId: string, ownerId: string, quantity: number): Promise<InventoryEntity> {
		return await this.inventories.save(this.inventories.create({
			roll: await this.rolls.findOne(rollId),
			owner: await this.characters.findMine(ownerId),
			quantity: quantity
		}));
	}

	async findAllWithCharacter(ownerId: string): Promise<Array<InventoryEntity>> {
		return await this.inventories.createQueryBuilder("inventory")
			.leftJoinAndSelect("inventory.owner", "owner")
			.leftJoinAndSelect("inventory.roll", "roll")
			.leftJoinAndSelect("roll.item", "item")
			.leftJoinAndSelect("item.category", "category")
			.leftJoinAndSelect("category.parent", "parent")
			.where("owner.id = :ownerId", {ownerId})
			.getMany();
	}

	async findOne(id: string): Promise<InventoryEntity> {
		return await this.inventories.findOneOrFail(id, {relations: ["owner", "roll", "roll.item", "item.category"]});
	}

	async update(id: string, quantity: number): Promise<InventoryEntity> {
		const inv = await this.findOne(id);
		inv.quantity = quantity;
		return await this.inventories.save(inv);
	}

	async delete(id: string) {
		await this.inventories.delete(id);
	}

}
