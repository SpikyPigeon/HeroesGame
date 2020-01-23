import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {NonPlayerCharacter} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {ShopEntity} from "../shop";

@Entity("NonPlayerCharacter")
export class NpcEntity implements NonPlayerCharacter {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@Column({length: 40})
	name!: string;

	@Column({type: "text"})
	description!: string;

	@ManyToOne(type => ShopEntity, {
		nullable: true,
	})
	shop!: ShopEntity;
}
