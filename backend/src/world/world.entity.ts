import {Check, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {World} from "heroes-common";
import {SquareEntity} from "./square.entity";

@Entity("World")
@Check(`"limitX" >= 1 AND "limitX" <= 255`)
@Check(`"limitY" >= 1 AND "limitY" <= 255`)
export class WorldEntity implements World {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		length: 40,
		unique: true,
	})
	name!: string;

	@Column()
	limitX!: number;

	@Column()
	limitY!: number;

	@Column({length: 7})
	color!: string;

	@Column({length: 40})
	bgImage!: string;

	@OneToMany(type => SquareEntity, square => square.world)
	squares!: SquareEntity[];
}
