import {Check, Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {EncounterDrop} from "heroes-common";
import {ItemEntity} from "../../item";
import {EncounterEntity} from "./encounter.entity";

@Entity("EncounterDrop")
@Check(`"dropChance" > 0 AND "dropChance" <= 1`)
@Check(`"minQuantity" > 0 AND "maxQuantity" >= "minQuantity"`)
export class EncounterDropEntity implements EncounterDrop {
	@PrimaryColumn()
	itemId!: number;

	@ManyToOne(type => ItemEntity)
    item!: ItemEntity;

	@PrimaryColumn()
	encounterId!: number;

	@ManyToOne(type => EncounterEntity)
    encounter!: EncounterEntity;

	@Column({
		type: "real",
		default: 0.5,
	})
    dropChance!: number;

	@Column({default: 1})
    minQuantity!: number;

	@Column({default: 1})
    maxQuantity!: number;
}
