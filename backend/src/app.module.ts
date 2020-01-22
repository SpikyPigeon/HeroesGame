import {RouterModule} from "nest-router";
import {Module} from "@nestjs/common";
import {routes} from "./app.routing";

import {CharacterModule} from "./character";
import {WorldModule} from "./world";
import {UserModule} from "./user";

@Module({
	imports: [
		RouterModule.forRoutes(routes),
		UserModule,
		CharacterModule,
		WorldModule,
	],
})
export class AppModule {
}
