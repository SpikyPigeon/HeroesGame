import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ShopSells} from "heroes-common";
import {ShopEntity} from "./shop.entity";
import {RollEntity} from "../../item";

@Entity("ShopSells")
export class ShopSellsEntity implements ShopSells {
	@PrimaryColumn()
	shopId!: number;

	@ManyToOne(type => ShopEntity, shop => shop.sells)
	shop!: ShopEntity;

	@PrimaryColumn()
	rollId!: string;

	@ManyToOne(type => RollEntity, {
		eager: true,
	})
	roll!: RollEntity;

	@Column()
	price!: number;
}
