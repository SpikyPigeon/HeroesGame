import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Item, ItemRarity} from "heroes-common";
import {CategoryEntity} from "./category.entity";

@Entity("Item")
export class ItemEntity implements Item {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 30,
		unique: true,
	})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@ManyToOne(type => CategoryEntity, category => category.items, {
		eager: true,
	})
	category!: CategoryEntity;

	@Column({
		type: "enum",
		enum: ["common", "uncommon", "rare", "legendary", "unique"],
		default: "common",
	})
	rarity!: ItemRarity;

	@Column({default: 0})
	heal!: number;

	@Column({default: 0})
	strengthMod!: number;

	@Column({default: 0})
	dexterityMod!: number;

	@Column({default: 0})
	vitalityMod!: number;

	@Column({default: 0})
	intellectMod!: number;

	@Column({default: 0})
	criticalChanceMod!: number;

	@Column({default: 0})
	criticalDamageMod!: number;

	@Column({default: 0})
	dodgeChanceMod!: number;

	@Column({default: 0})
	healthMod!: number;

	@Column({default: 0})
	manaMod!: number;

	@Column({default: 0})
	armorMod!: number;

	@Column({default: 0})
	damageMod!: number;

	@Column({default: 0})
	itemDropMod!: number;

	@Column({default: 0})
	goldDropMod!: number;

	@Column({default: 0})
	inventorySpace!: number;

	@Column({
		type: "simple-json",
		nullable: true,
		default: null
	})
	special!: Object;

	@Column()
	skill!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Column({default: 1})
	stackLimit!: number;
}
