const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const {resolve} = require("path");
const output = resolve(__dirname, "dist");

module.exports = {
	optimization: {
		minimizer: [
			new TerserJSPlugin({
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
				parallel: true,
				cache: true,
			}),
		],
		moduleIds: "hashed",
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	},
	entry: [
		"webpack-hot-middleware/client",
		resolve(__dirname, "./src"),
	],
	devServer: {
		contentBase: output,
		historyApiFallback: true,
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	output: {
		path: output,
		filename: "[name].[hash:8].js",
		chunkFilename: "[name].[hash:8].chunk.js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {
						transpileOnly: true,
						configFile: resolve(__dirname, "./tsconfig.json"),
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: {minimize: true},
					},
				],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebPackPlugin({
			template: resolve(__dirname, "./src/index.html"),
			filename: "./index.html"
		}),
		new CopyPlugin([
			{context: resolve(__dirname, `./src/assets/`), from: "**/*", to: "assets/"}
		])
	]
};
