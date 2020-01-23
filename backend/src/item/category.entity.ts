import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ItemCategory} from "heroes-common";
import {ItemEntity} from "./item.entity";

@Entity("ItemCategory")
export class CategoryEntity implements ItemCategory {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(type => CategoryEntity, category => category.children, {
		eager: true,
	})
	parent!: CategoryEntity;

	@Column({
		length: 30,
		unique: true,
	})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@OneToMany(type => CategoryEntity, category => category.parent)
	children!: CategoryEntity[];

	@OneToMany(type => ItemEntity, item => item.category)
	items!: ItemEntity[];
}
