import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ItemRoll} from "heroes-common";
import {ItemEntity} from "./item.entity";

@Entity("ItemRoll")
export class RollEntity implements ItemRoll {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ApiProperty()
	@ManyToOne(type => ItemEntity, {
		eager: true,
	})
	item!: ItemEntity;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	strengthMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	dexterityMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	vitalityMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	intellectMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	criticalChanceMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	criticalDamageMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	dodgeChanceMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	healthMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	manaMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	armorMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	damageMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	itemDropMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "real",
		default: 1.0,
	})
	goldDropMult!: number;

	@ApiProperty({required: false})
	@Column({
		type: "simple-json",
		nullable: true,
		default: null
	})
	special!: Object;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;
}
