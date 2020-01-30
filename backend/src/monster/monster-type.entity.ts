import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {MonsterType} from "heroes-common";
import {MonsterEntity} from "./monster.entity";

@Entity("MonsterType")
export class MonsterTypeEntity implements MonsterType {
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

	@OneToMany(type => MonsterEntity, monster => monster.type)
	monsters!: MonsterEntity[];
}
