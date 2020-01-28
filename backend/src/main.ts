import "reflect-metadata";
import {Express, static as serve} from "express";
import webpackHot from "webpack-hot-middleware";
import webpackDev from "webpack-dev-middleware";
import {NestFactory} from "@nestjs/core";
import webpack from "webpack";
import {last} from "lodash";
import {join} from "path";

import {AppModule} from "./app.module";

const webpackConfig = require("../../../frontend/webpack.config.js");

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const instance = app.getHttpAdapter().getInstance() as Express;
	app.enableCors();

	if (process.env.NODE_ENV === "production") {
		const path = join(__dirname, "../../frontend/dist");
		instance.use(serve(path));
		instance.get("*", (req, res) => res.sendFile(join(path, "index.html")));
	} else {
		const compiler = webpack({
			mode: "development",
			...webpackConfig
		});
		const dev = webpackDev(compiler, {
			stats: "errors-warnings",
			publicPath: webpackConfig.output.publicPath,
		});

		instance.use(dev);
		instance.use(webpackHot(compiler));
		instance.use((req, res, next) => {
			const reqPath = req.url;
			const file = last(reqPath.split("/"));

			if (file?.indexOf(".") === -1 && !reqPath.startsWith("/api")) {
				res.end(dev.fileSystem.readFileSync(join(webpackConfig.output.path, "index.html")));
			} else {
				next();
			}
		});
	}

	await app.listen(3000);
}

bootstrap();
