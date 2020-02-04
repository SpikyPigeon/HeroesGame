import {Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn} from "typeorm";
import {CharacterEquipment} from "heroes-common";
import {CharacterEntity} from "./character.entity";
import {RollEntity} from "../item";
import {ApiProperty} from "@nestjs/swagger";

@Entity("CharacterEquipment")
export class EquipmentEntity implements CharacterEquipment {
	@ApiProperty()
	@PrimaryColumn()
	playerId!: string;

	@ApiProperty()
	@OneToOne(type => CharacterEntity, character => character.equipment)
	@JoinColumn()
	player!: CharacterEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	headSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	chestSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	beltSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bootSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	leftHandSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	rightHandSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring1Slot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring2Slot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	neckSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bagSlot!: RollEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	artifactSlot!: RollEntity;
}
