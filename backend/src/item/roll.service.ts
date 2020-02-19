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
		return await this.rolls.find({relations: ["item", "item.category"]});
	}

	async findOne(id: string): Promise<RollEntity> {
		return await this.rolls.findOneOrFail(id, {relations: ["item", "item.category"]});
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
}
