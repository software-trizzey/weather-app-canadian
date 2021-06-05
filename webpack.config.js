const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// Add CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// For API key
const Dotenv = require("dotenv-webpack");

module.exports = {
	mode: "production",
	target: "web",
	entry: {
		entry: path.resolve(__dirname, "./src/index.js"),
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "main.js",
	},
	devServer: {
		contentBase: path.resolve(__dirname, "./dist"),
		compress: true,
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-transform-runtime"],
					},
				},
			},
			{ test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"] },
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [new NodePolyfillPlugin(), new Dotenv(), new MiniCssExtractPlugin()],
	resolve: {
		fallback: {
			fs: false,
			tls: false,
			net: false,
			path: false,
			zlib: false,
			http: false,
			https: false,
			stream: false,
			crypto: false,
			"crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
		},
	},
};
