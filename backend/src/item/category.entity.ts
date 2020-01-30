import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ItemCategory} from "heroes-common";
import {ItemEntity} from "./item.entity";

@Entity("ItemCategory")
export class CategoryEntity implements ItemCategory {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty({required: false})
	@Column({nullable: true})
	parentId!: number;

	@ManyToOne(type => CategoryEntity, category => category.children)
	parent!: CategoryEntity;

	@ApiProperty()
	@Column({
		length: 30,
		unique: true,
	})
	name!: string;

	@ApiProperty()
	@Column({type: "text"})
	description!: string;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;

	@OneToMany(type => CategoryEntity, category => category.parent)
	children!: CategoryEntity[];

	@OneToMany(type => ItemEntity, item => item.category)
	items!: ItemEntity[];
}
