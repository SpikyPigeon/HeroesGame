import {Column, Entity, JoinTable, ManyToOne, PrimaryColumn} from "typeorm";
import {Square} from "heroes-common";
import {WorldEntity} from "./world.entity";

@Entity("Square")
export class SquareEntity implements Square {
	@PrimaryColumn()
	worldId!: number;

	@PrimaryColumn()
	x!: number;

	@PrimaryColumn()
	y!: number;

	@Column({length: 40})
	image!: string;

	@ManyToOne(type => WorldEntity, world => world.squares)
	@JoinTable()
	world!: WorldEntity;
}
