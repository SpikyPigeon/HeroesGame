import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CharacterInventory} from "heroes-common";
import {CharacterEntity} from "../character.entity";
import {RollEntity} from "../../item";

@Entity("CharacterInventory")
export class InventoryEntity implements CharacterInventory {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(type => RollEntity)
	roll!: RollEntity;

	@ManyToOne(type => CharacterEntity, character => character.inventory)
	owner!: CharacterEntity;

	@Column({default: 1})
	quantity!: number;
}
