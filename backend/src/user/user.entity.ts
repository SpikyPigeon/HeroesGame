import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "heroes-common";
import {CharacterEntity} from "../character";
import {BankEntity} from "../bank";

@Entity("User")
export class UserEntity implements User {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ApiProperty()
	@Column({length: 30})
	firstName!: string;

	@ApiProperty()
	@Column({length: 30})
	lastName!: string;

	@ApiProperty()
	@Column({unique: true, length: 60})
	email!: string;

	@ApiProperty()
	@ManyToOne(type => BankEntity)
	bank!: BankEntity;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt!: Date;

	@ApiProperty()
	@Column({default: true})
	isActive!: boolean;

	@ApiProperty()
	@Column({default: false})
	isAdmin!: boolean;

	@Column({
		type: "text",
		select: false,
		name: "password"
	})
	password_hash!: string;

	@OneToMany(type => CharacterEntity, character => character.owner)
	characters!: CharacterEntity[];
}
