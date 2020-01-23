import {Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Bank} from "heroes-common";

@Entity("Bank")
export class BankEntity implements Bank {
	@PrimaryGeneratedColumn("uuid")
    id!: string;

	@Column()
    goldAmount!: number;

	@UpdateDateColumn()
    updatedAt!: Date;
}
