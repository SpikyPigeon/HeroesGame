import {ServeStaticModule} from '@nestjs/serve-static';
import {Module} from "@nestjs/common";
import {join} from "path";
import {UserModule} from "./user";

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "..", "..", "frontend", "dist"),
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {
}
