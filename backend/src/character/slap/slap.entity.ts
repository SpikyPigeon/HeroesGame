import {CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CharacterSlap} from "heroes-common";
import {CharacterEntity} from "../character.entity";

@Entity("CharacterSlap")
export class SlapEntity implements CharacterSlap {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(type => CharacterEntity)
	slapper!: CharacterEntity;

	@ManyToOne(type => CharacterEntity)
	slapped!: CharacterEntity;

	@CreateDateColumn()
	createdAt!: Date;
}
