import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {shopProviders} from "./shop.provider";
import {ShopService} from "./shop.service";
import {ShopController} from "./shop.controller";

@Module({
	exports: [
		ShopService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		ShopController,
	],
	providers: [
		...shopProviders,
		ShopService,
	],
})
export class ShopModule {
}
