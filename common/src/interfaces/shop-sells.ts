import {Shop} from "./shop";
import {ItemRoll} from "./item-roll";

export interface ShopSells {
	shop: Shop;
	roll: ItemRoll;
	price: number;
}
