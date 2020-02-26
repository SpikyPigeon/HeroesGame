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

	@ApiProperty({type: () => CharacterEntity})
	@OneToOne(type => CharacterEntity, character => character.equipment)
	@JoinColumn()
	player!: CharacterEntity;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	headSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	chestSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	beltSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bootSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	leftHandSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	rightHandSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring1Slot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	ring2Slot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	neckSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	bagSlot!: RollEntity | null;

	@ApiProperty()
	@ManyToOne(type => RollEntity, {
		nullable: true,
	})
	artifactSlot!: RollEntity | null;
}
