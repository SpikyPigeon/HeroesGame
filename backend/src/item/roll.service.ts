import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {ItemService} from "./item.service";
import {RollEntity} from "./roll.entity";

@Injectable()
export class RollService {
	constructor(
		@Inject("ROLL_REPOSITORY")
		private readonly rolls: Repository<RollEntity>,
		private readonly items: ItemService,
	) {
	}

	async findAll(): Promise<Array<RollEntity>> {
		return await this.rolls.createQueryBuilder("roll")
			.leftJoinAndSelect("roll.item", "item")
			.leftJoinAndSelect("item.category", "cat")
			.leftJoinAndSelect("cat.parent", "parent1")
			.leftJoinAndSelect("parent1.parent", "parent2")
			.getMany();
	}

	async findOne(id: string): Promise<RollEntity> {
		const roll = await this.rolls.createQueryBuilder("roll")
			.leftJoinAndSelect("roll.item", "item")
			.leftJoinAndSelect("item.category", "cat")
			.leftJoinAndSelect("cat.parent", "parent1")
			.leftJoinAndSelect("parent1.parent", "parent2")
			.where("roll.id = :id", {id})
			.getOne();

		if (roll) {
			return roll;
		} else {
			throw new Error("Roll was not found");
		}
	}

	async create(itemId: number): Promise<RollEntity> {
		const roll = this.rolls.create({
			item: await this.items.findOneItem(itemId),
		});

		Object.keys(roll.item).map(key => {
			if (key.endsWith("Mod") && Reflect.get(roll.item, key) > 0) {
				Reflect.set(roll, key.replace("Mod", "Mult"), Math.random() + Math.random());
			}
		});

		return await this.rolls.save(roll);
	}

	async delete(id: string) {
		await this.rolls.delete(id);
	}
}
