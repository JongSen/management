var path = require('path');
var webpack = require('webpack');
var Px2remWebpackPlugin = require('px2rem-webpack-plugin');
var config = require('../config');
var projectRoot = path.resolve(__dirname, '../');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var utils = require('./utils');

module.exports = {
	entry: {
		bundle: './src/index.js'
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: config.build.assetsPublicPath,
		filename: '[name].[hash:7].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components'),
			//'CK': path.resolve(__dirname, '../src/libs/ckplayer/ckplayer.js')
			'CK': path.resolve(__dirname, '../node_modules/ckplayer/ckplayer.js')
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		preLoaders: [
			{
				test: /\.vue$/,
				loader: 'eslint',
				include: projectRoot,
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'eslint',
				include: projectRoot,
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules/
			},{
				test: /\.vue$/,
				loader: 'vue'
			},{
				test: /\.html$/,
				loader: 'vue-html'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
				  limit: 1000,
				  name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
				  limit: 10000,
				  name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	vue: {
		loaders: utils.cssLoaders()
	},
	postcss: function () {
		return [autoprefixer]
	},
	plugins: [
		new Px2remWebpackPlugin({originScreenWidth: 750}),
		//new webpack.optimize.CommonsChunkPlugin('common.[hash:7].js'),
		//new ExtractTextPlugin("style.[hash:7].css"),
		new webpack.ProvidePlugin({
			// eslint-disable-next-line import/no-unresolved
			Promise: 'exports?module.exports.default!babel-runtime/core-js/promise'
		})
	]
};
