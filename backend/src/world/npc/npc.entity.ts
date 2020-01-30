import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {NonPlayerCharacter} from "heroes-common";
import {SquareEntity} from "../square.entity";
import {ShopEntity} from "../shop";

@Entity("NonPlayerCharacter")
export class NpcEntity implements NonPlayerCharacter {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id!: number;

	@ApiProperty({type: () => SquareEntity})
	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@ApiProperty()
	@Column({length: 40})
	name!: string;

	@ApiProperty()
	@Column({type: "text"})
	description!: string;

	@ManyToOne(type => ShopEntity, {
		nullable: true,
	})
	shop!: ShopEntity;
}
