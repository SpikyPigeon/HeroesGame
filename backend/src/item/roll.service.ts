import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {ItemEntity} from "./item.entity";
import {RollEntity} from "./roll.entity";

@Injectable()
export class RollService {
	constructor(
		@Inject("ITEM_REPOSITORY")
		private readonly items: Repository<ItemEntity>,
		@Inject("ROLL_REPOSITORY")
		private readonly rolls: Repository<RollEntity>,
	) {
	}
}
