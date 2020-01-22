import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";
import {routes} from "./app.routing";
import {UserModule} from "./user";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
	],
})
export class AppModule {
}
