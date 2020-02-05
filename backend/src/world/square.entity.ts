import {Column, Entity, JoinTable, ManyToOne, PrimaryColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Square} from "heroes-common";
import {WorldEntity} from "./world.entity";

@Entity("Square")
export class SquareEntity implements Square {
	@PrimaryColumn()
	worldId!: number;

	@ApiProperty()
	@PrimaryColumn()
	x!: number;

	@ApiProperty()
	@PrimaryColumn()
	y!: number;

	@ApiProperty()
	@Column({length: 40})
	image!: string;

	@ApiProperty()
	@ManyToOne(type => WorldEntity, world => world.squares)
	@JoinTable()
	world!: WorldEntity;
}
