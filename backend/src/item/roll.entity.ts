import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ItemRoll} from "heroes-common";
import {ItemEntity} from "./item.entity";

@Entity("ItemRoll")
export class RollEntity implements ItemRoll {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(type => ItemEntity)
	item!: ItemEntity;

	@Column({
		type: "real",
		default: 1.0,
	})
	strengthMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	dexterityMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	vitalityMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	intellectMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	criticalChanceMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	criticalDamageMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	dodgeChanceMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	healthMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	manaMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	armorMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	damageMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	itemDropMult!: number;

	@Column({
		type: "real",
		default: 1.0,
	})
	goldDropMult!: number;

	@Column({
		type: "simple-json",
		nullable: true,
		default: null
	})
	special!: Object;

	@CreateDateColumn()
	createdAt!: Date;
}
