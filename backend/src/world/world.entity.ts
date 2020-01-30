import {Check, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {World} from "heroes-common";
import {SquareEntity} from "./square.entity";

@Entity("World")
@Check(`"limitX" >= 1 AND "limitX" <= 255`)
@Check(`"limitY" >= 1 AND "limitY" <= 255`)
export class WorldEntity implements World {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty()
	@Column({
		length: 40,
		unique: true,
	})
	name!: string;

	@ApiProperty()
	@Column()
	limitX!: number;

	@ApiProperty()
	@Column()
	limitY!: number;

	@ApiProperty()
	@Column({length: 7})
	color!: string;

	@ApiProperty()
	@Column({length: 40})
	bgImage!: string;

	@OneToMany(type => SquareEntity, square => square.world)
	squares!: SquareEntity[];
}
