import {forwardRef, Module} from "@nestjs/common";
import {InventoryController} from "./inventory.controller";
import {InventoryService} from "./inventory.service";
import {inventoryProviders} from "./inventory.provider";
import {DatabaseModule} from "../../database";
import {ItemModule} from "../../item";

@Module({
	exports: [
		InventoryService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => ItemModule),
	],
	controllers: [
		InventoryController,
	],
	providers: [
		...inventoryProviders,
		InventoryService,
	],
})
export class InventoryModule {
}
