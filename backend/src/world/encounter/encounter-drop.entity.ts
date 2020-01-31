import {Check, Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {EncounterDrop} from "heroes-common";
import {EncounterEntity} from "./encounter.entity";
import {ItemEntity} from "../../item";

@Entity("EncounterDrop")
@Check(`"dropChance" > 0 AND "dropChance" <= 1`)
@Check(`"minQuantity" > 0 AND "maxQuantity" >= "minQuantity"`)
export class EncounterDropEntity implements EncounterDrop {
	@ApiProperty()
	@PrimaryColumn()
	itemId!: number;

	@ManyToOne(type => ItemEntity)
	item!: ItemEntity;

	@ApiProperty()
	@PrimaryColumn()
	encounterId!: number;

	@ManyToOne(type => EncounterEntity)
	encounter!: EncounterEntity;

	@ApiProperty()
	@Column({
		type: "real",
		default: 0.5,
	})
	dropChance!: number;

	@ApiProperty()
	@Column({default: 1})
	minQuantity!: number;

	@ApiProperty()
	@Column({default: 1})
	maxQuantity!: number;
}
