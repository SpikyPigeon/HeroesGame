import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Structure, StructureType} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {ShopEntity} from "../shop";
import {ApiProperty} from "@nestjs/swagger";

@Entity("Structure")
export class StructureEntity implements Structure {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty({type: () => SquareEntity})
	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@ApiProperty()
	@Column({length: 40})
	name!: string;

	@ApiProperty()
	@Column({type: "text"})
	description!: string;

	@ApiProperty({
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
	})
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
