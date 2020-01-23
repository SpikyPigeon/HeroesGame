import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MonsterType} from "heroes-common";
import {MonsterEntity} from "./monster.entity";

@Entity("MonsterType")
export class MonsterTypeEntity implements MonsterType {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 40,
		unique: true,
	})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@OneToMany(type => MonsterEntity, monster => monster.type)
	monsters!: MonsterEntity[];
}
