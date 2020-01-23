import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CharacterInventory} from "heroes-common";
import {RollEntity} from "../item";
import {CharacterEntity} from "./character.entity";

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
