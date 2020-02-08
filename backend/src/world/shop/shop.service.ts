import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CreateSellsInfo, ShopInfo, UpdateSellsInfo} from "./shop.dto";
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

	async createShop(data: ShopInfo): Promise<ShopEntity> {
		return await this.shops.save(this.shops.create({
			priceMod: data.priceMod,
		}));
	}

	async createSell(data: CreateSellsInfo): Promise<ShopSellsEntity> {
		return await this.sells.save(this.sells.create({
			shopId: data.shopId,
			rollId: data.rollId,
			price: data.price,
		}));
	}

	async findAllShops(): Promise<ShopEntity[]> {
		return await this.shops.find();
	}

	async findAllSells(): Promise<ShopSellsEntity[]> {
		return await this.sells.find();
	}

	async findOneShop(id: number): Promise<ShopEntity> {
		return await this.shops.findOneOrFail({where: {id}});
	}

	async findOneSell(id: number): Promise<ShopSellsEntity> {
		return await this.sells.findOneOrFail({where: {id}});
	}

	async updateShop(id: number, newShop: ShopInfo): Promise<ShopEntity> {
		const shop = await this.findOneShop(id);
		shop.priceMod = newShop.priceMod;
		return await this.shops.save(shop);
	}

	async updateSell(id: number, newSell: UpdateSellsInfo): Promise<ShopSellsEntity> {
		const sell = await this.findOneSell(id);
		sell.price = newSell.price;
		return await this.sells.save(sell);
	}
}
