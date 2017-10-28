// dev-server.js
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var path = require('path')
var WebpackHotMiddleware = require('webpack-hot-middleware')
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())

var app = express();
app.use(express.static(path.resolve(__dirname)))

// webpack编译器
var compiler = webpack(webpackConfig);

// webpack-dev-server中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    poll: true,
    hot: true,
    // noInfo: true,
    // lazy: false,
    stats: {
        colors: true,
        chunks: false
    }
});


app.use(devMiddleware)
app.use(WebpackHotMiddleware(compiler))


// 路由
app.get('/:viewname?', function(req, res, next) {

    var viewname = req.params.viewname 
        ? req.params.viewname + '.html' 
        : 'index.html';

    var filepath = path.join(compiler.outputPath, viewname);

    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

module.exports = app.listen(8011, function(err) {
    if (err) {
        // do something
        console.log(err)
        return;
    }

    console.log('Listening at http://localhost:' + 8011 + '\n')
})

if(module.hot){
    module.hot.accpet() //接受模块更新的事件，同时阻止这个事件继续冒泡
 }
