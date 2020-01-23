import {Module} from "@nestjs/common";
import {BankController} from "./bank.controller";
import {BankService} from "./bank.service";
import {bankProviders} from "./bank.provider";
import {DatabaseModule} from "../database";

@Module({
	exports: [
		BankService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		BankController,
	],
	providers: [
		...bankProviders,
		BankService,
	],
})
export class BankModule {
}
