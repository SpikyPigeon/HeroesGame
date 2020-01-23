import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "heroes-common";
import {ShopSellsEntity} from "./shop-sells.entity";

@Entity("Shop")
export class ShopEntity implements Shop {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: "real",
		default: 1,
	})
	priceMod!: number;

	@OneToMany(type => ShopSellsEntity, sells => sells.shop, {
		eager: true,
	})
	sells!: ShopSellsEntity[];
}
