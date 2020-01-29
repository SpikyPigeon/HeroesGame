import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Bank} from "heroes-common";

@Entity("Bank")
export class BankEntity implements Bank {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ApiProperty()
	@Column()
	goldAmount!: number;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt!: Date;
}
