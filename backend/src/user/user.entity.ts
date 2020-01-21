import {User, Bank} from "heroes-common";
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("User")
export class UserEntity implements User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({length: 30})
    firstName!: string;

    @Column({length: 30})
    lastName!: string;

    @Column({unique: true, length: 60})
    email!: string;

    bank!: Bank;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({default: true})
    isActive!: boolean;

    @Column({default: false})
    isAdmin!: boolean;

    @Column({
        type: "text",
        select: false,
        name: "password"
    })
    password_hash!: string;
}
