import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {CategoryEntity} from "./category.entity";
import {ItemEntity} from "./item.entity";

@Injectable()
export class ItemService {
	constructor(
		@Inject("CATEGORY_REPOSITORY")
		private readonly categories: Repository<CategoryEntity>,
		@Inject("ITEM_REPOSITORY")
		private readonly items: Repository<ItemEntity>
	) {
	}
}
