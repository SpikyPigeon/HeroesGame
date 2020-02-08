import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Param, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateSellsInfo, ShopInfo, UpdateSellsInfo} from "./shop.dto";
import {ShopSellsEntity} from "./shop-sells.entity";
import {ShopService} from "./shop.service";
import {ShopEntity} from "./shop.entity";

@ApiTags("world")
@Controller("shop")
export class ShopController {
	private readonly logger: Logger = new Logger(ShopController.name);

	constructor(private readonly shops: ShopService) {
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: ShopSellsEntity})
	@ApiBody({type: CreateSellsInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post("sell")
	async createSell(data: CreateSellsInfo): Promise<ShopSellsEntity> {
		this.logger.log(`createSell`);
		return await this.shops.createSell(data);
	}

	@ApiOkResponse({type: ShopSellsEntity, isArray: true})
	@Get("sell")
	async findAllSells(): Promise<ShopSellsEntity[]> {
		this.logger.log(`findAllSells`);
		return await this.shops.findAllSells();
	}

	@ApiOkResponse({type: ShopSellsEntity})
	@Get("sell/:id")
	async findOneSell(@Param() id: number): Promise<ShopSellsEntity> {
		this.logger.log(`findOneSell => ${id}`);
		return await this.shops.findOneSell(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: ShopSellsEntity})
	@ApiBody({type: UpdateSellsInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put("sell/:id")
	async updateSell(@Param() id: number, @Body() data: UpdateSellsInfo): Promise<ShopSellsEntity> {
		this.logger.log(`updateSell => ${id}`);
		return await this.shops.updateSell(id, data);
	}

	@ApiBearerAuth()
	@ApiCreatedResponse({type: ShopEntity})
	@ApiBody({type: ShopInfo})
	@UseGuards(AuthGuard("jwt"))
	@Post()
	async createShop(@Body() data: ShopInfo): Promise<ShopEntity> {
		this.logger.log(`createShop`);
		return await this.shops.createShop(data);
	}

	@ApiOkResponse({type: ShopEntity, isArray: true})
	@Get()
	async findAllShops(): Promise<ShopEntity[]> {
		this.logger.log(`findAllShops`);
		return await this.shops.findAllShops();
	}

	@ApiOkResponse({type: ShopEntity})
	@Get(":id")
	async findOneShop(@Param() id: number): Promise<ShopEntity> {
		this.logger.log(`findOneShop => ${id}`);
		return await this.shops.findOneShop(id);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: ShopEntity})
	@ApiBody({type: ShopInfo})
	@UseGuards(AuthGuard("jwt"))
	@Put(":id")
	async updateShop(@Param() id: number, @Body() data: ShopInfo): Promise<ShopEntity> {
		this.logger.log(`updateShop => ${id}`);
		return await this.shops.updateShop(id, data);
	}
}
