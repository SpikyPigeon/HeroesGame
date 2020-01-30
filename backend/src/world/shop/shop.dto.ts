import {ApiProperty} from "@nestjs/swagger";

export class ShopInfo {
	@ApiProperty()
	priceMod: number = 0;
}

export class CreateSellsInfo {
	@ApiProperty()
	shopId: number = 0;

	@ApiProperty()
	rollId: string = "";

	@ApiProperty()
	price: number = 0;
}

export class UpdateSellsInfo {
	@ApiProperty()
	price: number = 0;
}
