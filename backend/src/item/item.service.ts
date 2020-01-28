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

	async updateCategory(id: number, name: string, description: string, parentId?: number): Promise<CategoryEntity> {
		const cat = await this.findOneCategory(id);
		cat.name = name;
		cat.description = description;

		if (parentId) {
			cat.parent = await this.findOneCategory(parentId);
		}

		return await this.categories.save(cat);
	}

	async findAllItems(): Promise<Array<ItemEntity>> {
		return await this.items.find();
	}

	async findOneItem(id: number): Promise<ItemEntity> {
		return await this.items.findOneOrFail(id);
	}

	async createItem(name: string, description: string, categoryId: number): Promise<ItemEntity> {
		return await this.items.save(this.items.create({
			category: await this.findOneCategory(categoryId),
			description,
			name,
		}));
	}

	async updateItem(id: number, data: Partial<ItemEntity>): Promise<ItemEntity> {
		await this.items.update(id, {...data});
		return await this.findOneItem(id);
	}
}
