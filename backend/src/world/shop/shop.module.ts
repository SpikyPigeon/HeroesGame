import {forwardRef, Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {shopProviders} from "./shop.provider";
import {ShopService} from "./shop.service";
import {ShopController} from "./shop.controller";
import {UserModule} from "../../user";

@Module({
	exports: [
		ShopService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
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
