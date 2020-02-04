import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Avatar} from "heroes-common";

@Entity("Avatar")
export class AvatarEntity implements Avatar {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Column({length: 100})
	filename!: string;
}
