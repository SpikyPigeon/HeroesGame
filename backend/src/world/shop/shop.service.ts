import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ShopSellsEntity} from "./shop-sells.entity";
import {ShopEntity} from "./shop.entity";

@Injectable()
export class ShopService {
	constructor(
		@Inject("SHOP_REPOSITORY")
		private readonly shops: Repository<ShopEntity>,
		@Inject("SHOP_SELLS_REPOSITORY")
		private readonly sells: Repository<ShopSellsEntity>,
	) {
	}
}
