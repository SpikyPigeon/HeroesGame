import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Structure, StructureType} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {ShopEntity} from "../shop";

@Entity("Structure")
export class StructureEntity implements Structure {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@Column({length: 40})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@Column({
		type: "enum",
		enum: [
			"camp",
			"village",
			"city",
			"fort",
			"castle",
			"dungeon",
			"monster-camp",
			"caravan",
			"bank",
		],
		default: "camp",
	})
	type!: StructureType;

	@ManyToOne(type => ShopEntity, {
		nullable: true,
	})
	shop!: ShopEntity;
}
