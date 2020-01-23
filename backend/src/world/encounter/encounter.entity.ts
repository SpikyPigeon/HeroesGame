import {Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Encounter} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {MonsterEntity} from "../../monster";

@Entity("Encounter")
@Check(`"minGold" > 0 AND "maxGold" > "minGold"`)
export class EncounterEntity implements Encounter {
	@PrimaryGeneratedColumn()
    id!: number;

	@ManyToOne(type => SquareEntity)
    square!: SquareEntity;

	@ManyToOne(type => MonsterEntity)
    monster!: MonsterEntity;

	@Column({
		type: "real",
		default: 0.5,
	})
    spawnChance!: number;

	@Column({default: 1})
    minGold!: number;

	@Column({default: 2})
    maxGold!: number;
}
