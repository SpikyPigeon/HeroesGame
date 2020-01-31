import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateSellsInfo, ShopInfo, UpdateSellsInfo} from "./shop.dto";
import {ShopSellsEntity} from "./shop-sells.entity";
import {ShopService} from "./shop.service";
import {ShopEntity} from "./shop.entity";

@ApiTags("world")
@Controller()
export class ShopController {
	constructor(private readonly shops: ShopService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: ShopEntity})
	@ApiBody({type: ShopInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createShop(@Body() data: ShopInfo): Promise<ShopEntity> {
		return await this.shops.createShop(data);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: ShopSellsEntity})
	@ApiBody({type: CreateSellsInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post("sell")
	async createSell(data: CreateSellsInfo): Promise<ShopSellsEntity> {
		return await this.shops.createSell(data);
	}

	@ApiOkResponse({type: ShopEntity, isArray: true})
	@Get()
	async findAllShops(): Promise<ShopEntity[]> {
		return await this.shops.findAllShops();
	}

	@ApiOkResponse({type: ShopSellsEntity, isArray: true})
	@Get("sell")
	async findAllSells(): Promise<ShopSellsEntity[]> {
		return await this.shops.findAllSells();
	}

	@ApiOkResponse({type: ShopEntity})
	@Get(":id")
	async findOneShop(@Param() id: number): Promise<ShopEntity> {
		return await this.shops.findOneShop(id);
	}

	@ApiOkResponse({type: ShopSellsEntity})
	@Get("sell/:id")
	async findOneSell(@Param() id: number): Promise<ShopSellsEntity> {
		return await this.shops.findOneSell(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: ShopEntity})
	@ApiBody({type: ShopInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateShop(@Param() id: number, @Body() data: ShopInfo): Promise<ShopEntity> {
		return await this.shops.updateShop(id, data);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: ShopSellsEntity})
	@ApiBody({type: UpdateSellsInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put("sell/:id")
	async updateSell(@Param() id: number, @Body() data: UpdateSellsInfo): Promise<ShopSellsEntity> {
		return await this.shops.updateSell(id, data);
	}

}
