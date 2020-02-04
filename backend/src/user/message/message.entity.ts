import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserMessage} from "heroes-common";
import {UserEntity} from "../user.entity";

@Entity("UserMessage")
export class MessageEntity implements UserMessage {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ApiProperty()
	@ManyToOne(type => UserEntity)
	sender!: UserEntity;

	@ApiProperty()
	@ManyToOne(type => UserEntity)
	receiver!: UserEntity;

	@ApiProperty()
	@ManyToOne(type => MessageEntity, message => message.children, {
		eager: true,
	})
	previous!: MessageEntity;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;

	@ApiProperty()
	@Column({length: 60})
	title!: string;

	@ApiProperty()
	@Column({type: "text"})
	content!: string;

	@OneToMany(type => MessageEntity, message => message.previous)
	children!: MessageEntity[];
}
