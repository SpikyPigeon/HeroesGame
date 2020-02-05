import {ApiProperty} from "@nestjs/swagger";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import {PlayerCharacter} from "heroes-common";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarEntity} from "./avatar.entity";
import {SquareEntity} from "../world";
import {UserEntity} from "../user";
import {InventoryEntity} from "./inventory";

@Entity("PlayerCharacter")
export class CharacterEntity implements PlayerCharacter {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ApiProperty({type: () => UserEntity})
	@ManyToOne(type => UserEntity, user => user.characters)
	owner!: UserEntity;

	@ApiProperty()
	@Column({length: 30})
	name!: string;

	@ApiProperty()
	@ManyToOne(type => AvatarEntity)
	avatar!: AvatarEntity;

	@ApiProperty({type: () => SquareEntity})
	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@ApiProperty()
	@Column({default: 0})
	experience!: number;

	@ApiProperty()
	@Column({default: 1})
	level!: number;

	@ApiProperty()
	@Column({default: 10})
	strength!: number;

	@ApiProperty()
	@Column({default: 10})
	dexterity!: number;

	@ApiProperty()
	@Column({default: 10})
	vitality!: number;

	@ApiProperty()
	@Column({default: 10})
	intellect!: number;

	@ApiProperty()
	@Column()
	currentHealth!: number;

	@ApiProperty()
	@Column()
	currentMana!: number;

	@ApiProperty()
	@Column({default: 200})
	currentEnergy!: number;

	@ApiProperty()
	@Column({default: 0})
	gold!: number;

	@ApiProperty()
	@Column({default: 0})
	gem!: number;

	@ApiProperty()
	@Column({default: false})
	isDead!: boolean;

	@ApiProperty()
	@Column({default: true})
	isActive!: boolean;

	@ApiProperty()
	@CreateDateColumn()
	createdAt!: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt!: Date;

	@ApiProperty()
	@OneToOne(type => EquipmentEntity, equipment => equipment.player)
	equipment!: EquipmentEntity;

	@OneToMany(type => InventoryEntity, inventory => inventory.owner)
	inventory!: InventoryEntity[];
}
