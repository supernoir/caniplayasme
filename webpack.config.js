const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry : './src/index.js',
	mode  : 'production',
	output: {
		path    : path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},
	module: {
		rules: [
			{
				enforce: 'pre', // pre loader (https://github.com/MoOx/eslint-loader)
				test   : /\*.jsx?$/,
				exclude: /node_modules/,
				loader : 'eslint-loader'
			},
			{
				test  : /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
			{
				enforce: 'pre',
				test   : /\.js$/,
				loader : 'source-map-loader'
			},
			{
				test   : /\.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
				query  : {
					presets: ['react', 'es2015']
				}
			},
			{
				test   : /\.(ttf|eot|woff|woff2)$/,
				loader : 'file-loader',
				options: {
					name: 'media/fonts/[name].[ext]'
				}
			},
			{
				test   : /\.(png|svg|jpg|gif)$/,
				loader : 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
			},
			{
				test  : /\.json$/,
				loader: 'json-loader'
			},
			{
				test   : /\.(sass|scss)$/,
				exclude: /node_modules/,
				use    : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename     : '[name].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			title   : 'Can I Play As Me?',
			filename: 'index.html',
			template: 'index.html'
		}),
		new webpack.DefinePlugin({
			   'process.env.NODE_ENV': JSON.stringify('production')
			 })
	]
};
