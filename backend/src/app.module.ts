import {Module} from "@nestjs/common";
import {resolve} from "path";
import {UserModule} from "./user";

@Module({
	imports: [
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
