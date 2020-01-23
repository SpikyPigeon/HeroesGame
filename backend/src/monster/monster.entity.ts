import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Monster} from "heroes-common";
import {MonsterTypeEntity} from "./monster-type.entity";

@Entity("Monster")
export class MonsterEntity implements Monster {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 40,
		unique: true,
	})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@ManyToOne(type => MonsterTypeEntity, type => type.monsters)
	type!: MonsterTypeEntity;

	@Column({default: 1})
	level!: number;

	@Column({default: 10})
	strength!: number;

	@Column({default: 10})
	dexterity!: number;

	@Column({default: 10})
	vitality!: number;

	@Column({default: 10})
	intellect!: number;

	@Column({length: 40})
	picture!: string;
}
