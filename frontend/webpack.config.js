const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require("path");
const output = path.resolve(__dirname, "dist");

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
	devServer: {
		contentBase: output,
		historyApiFallback: true,
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	output: {
		path: output,
		filename: "[name].[contenthash:8].js",
		chunkFilename: "[name].[contenthash:8].chunk.js",
		publicPath: "/",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
					options: {transpileOnly: true}
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
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
		new CopyPlugin([
			{context: './src/assets/', from: '**/*', to: 'assets/'}
		])
	]
};
