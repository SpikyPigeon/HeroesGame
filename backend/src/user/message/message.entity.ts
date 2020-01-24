import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserMessage} from "heroes-common";
import {UserEntity} from "../user.entity";

@Entity("UserMessage")
export class MessageEntity implements UserMessage {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(type => UserEntity)
	sender!: UserEntity;

	@ManyToOne(type => UserEntity)
	receiver!: UserEntity;

	@ManyToOne(type => MessageEntity, message => message.children, {
		eager: true,
	})
	previous!: MessageEntity;

	@CreateDateColumn()
	createdAt!: Date;

	@Column({length: 60})
	title!: string;

	@Column({type: "text"})
	content!: string;

	@OneToMany(type => MessageEntity, message => message.previous)
	children!: MessageEntity[];
}
