import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Item, ItemRarity} from "heroes-common";
import {CategoryEntity} from "./category.entity";

@Entity("Item")
export class ItemEntity implements Item {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Column({
		length: 30,
		unique: true,
	})
	name!: string;

	@ApiProperty()
	@Column({type: "text"})
	description!: string;

	@ApiProperty({type: () => CategoryEntity})
	@ManyToOne(type => CategoryEntity, category => category.items, {
		eager: true,
	})
	category!: CategoryEntity;

	@ApiProperty({enum: ["common", "uncommon", "rare", "legendary", "unique"]})
	@Column({
		type: "enum",
		enum: ["common", "uncommon", "rare", "legendary", "unique"],
		default: "common",
	})
	rarity!: ItemRarity;

	@ApiProperty({required: false})
	@Column({default: 0})
	heal!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	strengthMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	dexterityMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	vitalityMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	intellectMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	criticalChanceMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	criticalDamageMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	dodgeChanceMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	healthMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	manaMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	armorMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	damageMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	itemDropMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	goldDropMod!: number;

	@ApiProperty({required: false})
	@Column({default: 0})
	inventorySpace!: number;

	@ApiProperty({required: false})
	@Column({
		type: "simple-json",
		nullable: true,
		default: null
	})
	special!: Object;

	@ApiProperty({required: false})
	@Column({nullable: true})
	skill!: number;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt!: Date;

	@ApiProperty()
	@Column({default: 1})
	stackLimit!: number;

	@ApiProperty()
	@Column({
		length: 40,
		nullable: true
	})
	image!: string;
}
