import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Monster} from "heroes-common";
import {MonsterTypeEntity} from "./monster-type.entity";

@Entity("Monster")
export class MonsterEntity implements Monster {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Column({
		length: 40,
		unique: true,
	})
	name!: string;

	@ApiProperty()
	@Column({type: "text"})
	description!: string;

	@ApiProperty({type: () => MonsterTypeEntity})
	@ManyToOne(type => MonsterTypeEntity, type => type.monsters)
	type!: MonsterTypeEntity;

	@ApiProperty()
	@Column({default: 1})
	level!: number;

	@ApiProperty()
	@Column({default: 10})
	strength!: number;

	@ApiProperty()
	@Column({default: 10})
	dexterity!: number;

	@ApiProperty()
	@Column({default: 10})
	vitality!: number;

	@ApiProperty()
	@Column({default: 10})
	intellect!: number;

	@ApiProperty()
	@Column({length: 40})
	picture!: string;
}
