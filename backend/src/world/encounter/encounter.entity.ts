import {Check, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Encounter} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {MonsterEntity} from "../../monster";

@Entity("Encounter")
@Check(`"minGold" > 0 AND "maxGold" > "minGold"`)
export class EncounterEntity implements Encounter {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@ApiProperty()
	@ManyToOne(type => MonsterEntity)
	monster!: MonsterEntity;

	@ApiProperty()
	@Column({
		type: "real",
		default: 0.5,
	})
	spawnChance!: number;

	@ApiProperty()
	@Column({default: 1})
	minGold!: number;

	@ApiProperty()
	@Column({default: 2})
	maxGold!: number;
}
