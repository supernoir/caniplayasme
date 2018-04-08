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
	module : {
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
			title   : '友漢字 - TomoKanji',
			filename: 'index.html',
			template: 'index.html'
		}),
		new webpack.DefinePlugin({
			   'process.env.NODE_ENV': JSON.stringify('production')
			 })
	]
};
