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
		private readonly items: Repository<ItemEntity>,
	) {
	}

	async findAllCategories(): Promise<Array<CategoryEntity>> {
		return await this.categories.find();
	}

	async findOneCategory(id: number): Promise<CategoryEntity> {
		return await this.categories.findOneOrFail(id);
	}

	async createCategory(name: string, description: string, parentId?: number): Promise<CategoryEntity> {
		const cat = this.categories.create({
			name,
			description,
		});

		if (parentId) {
			cat.parent = await this.findOneCategory(parentId);
		}

		return await this.categories.save(cat);
	}
}
