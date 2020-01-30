import {forwardRef, Module} from '@nestjs/common';
import {ItemController} from './item.controller';
import {ItemService} from './item.service';
import {RollController} from "./roll.controller";
import {RollService} from "./roll.service";
import {itemProviders} from "./item.provider";
import {DatabaseModule} from "../database";
import {UserModule} from "../user";

@Module({
	exports: [
		ItemService,
		RollService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
	],
	controllers: [
		ItemController,
		RollController,
	],
	providers: [
		...itemProviders,
		ItemService,
		RollService,
	],
})
export class ItemModule {
}
