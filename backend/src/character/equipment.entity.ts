import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {CharacterEquipment} from "heroes-common";
import {CharacterEntity} from "./character.entity";
import {RollEntity} from "../item";

@Entity("CharacterEquipment")
export class EquipmentEntity implements CharacterEquipment {
	@PrimaryColumn()
	playerId!: string;

	@OneToOne(type => CharacterEntity, character => character.equipment)
	@JoinColumn()
	player!: CharacterEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	headSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	chestSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	beltSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bootSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	leftHandSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	rightHandSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring1Slot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring2Slot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	neckSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bagSlot!: RollEntity;

	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	artifactSlot!: RollEntity;
}
