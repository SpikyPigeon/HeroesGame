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
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(type => UserEntity, user => user.characters)
	owner!: UserEntity;

	@Column({length: 30})
	name!: string;

	@ManyToOne(type => AvatarEntity)
	avatar!: AvatarEntity;

	@ManyToOne(type => SquareEntity)
	square!: SquareEntity;

	@Column({default: 0})
	experience!: number;

	@Column({default: 1})
	level!: number;

	@Column({default: 10})
	strength!: number;

	@Column({default: 10})
	dexterity!: number;

	@Column({default: 10})
	vitality!: number;

	@Column({default: 10})
	intellect!: number;

	@Column()
	currentHealth!: number;

	@Column()
	currentMana!: number;

	@Column({default: 200})
	currentEnergy!: number;

	@Column({default: 0})
	gold!: number;

	@Column({default: 0})
	gem!: number;

	@Column({default: false})
	isDead!: boolean;

	@Column({default: true})
	isActive!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToOne(type => EquipmentEntity, equipment => equipment.player)
	equipment!: EquipmentEntity;

	@OneToMany(type => InventoryEntity, inventory => inventory.owner)
	inventory!: InventoryEntity[];
}
