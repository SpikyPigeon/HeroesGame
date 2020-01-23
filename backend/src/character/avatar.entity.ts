import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Avatar} from "heroes-common";

@Entity("Avatar")
export class AvatarEntity implements Avatar {
	@PrimaryGeneratedColumn()
    id!: number;

	@Column({length: 100})
    filename!: string;
}
