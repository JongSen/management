var path = require('path');
var config = require('../config');
var express = require('express');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var WebpackDevMiddleware = require('webpack-dev-middleware');
var WebpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing'
	? require('./webpack.prod.conf')
	: require('./webpack.dev.conf');

var port = process.env.PORT || config.dev.port;
var proxyTable = config.dev.proxyTable;

var app = express();
console.log(webpackConfig)

var compiler = webpack(webpackConfig);
console.log(compiler)

var devMiddleware = WebpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true,
		chunks: false
	}
});

var hotMiddleware = WebpackHotMiddleware(compiler);

compiler.plugin('compilation', function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit', function(data, callback){
		hotMiddleware.publish({ action: 'reload' });
		callback();
	})
});

Object.keys(proxyTable).forEach(function (context) {
	var options = proxyTable[context];
	if (typeof options === 'string') {
		options = { target: options }
	}
	app.use(proxyMiddleware(context, options))
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);
app.use(hotMiddleware);

var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + port + '\n');
});