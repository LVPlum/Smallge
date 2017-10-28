const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const HappyPack = require('happypack');

let entries = {}
let chunks = []
let htmls = []

//同步获取某个目录下的所有的js文件
let globmaths =  glob.sync("./src/html/**/*.js",{
    nodir:true,
})
let hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
globmaths.forEach(function(name) {
    let n = name.slice(name.lastIndexOf('src/') + 4, name.length - 3);

    // 带app的js则使用文件夹名字
    let index = n.indexOf('app');
    if ( ~index && index == n.length - 3) {
        n = n.substring(0, n.length - 4);
    }
    
    entries[n] = [name];
    entries[n].push(hotMiddlewareScript);
    chunks.push(n);
});

glob.sync('./src/html/**/*.html').forEach(function(name) {
    let n = name.slice(name.lastIndexOf('src/') + 4, name.length - 5);
    htmls.push(n);
});

let myAssets = ['css', 'script', 'image', 'launch', 'icon'];

let assetsArr = [];
myAssets.forEach(function(item){
    assetsArr.push({ from: path.resolve(__dirname, './src/' + item), to: path.resolve(__dirname, './dist/' + item)})
})

let config = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
        // hot 模式下需要用http地址
        publicPath: process.env.NODE_ENV === 'production' ? '../../' : 'http://192.168.1.216:8011/'
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        extensions: ['.js', '.vue'],
        alias: {
            css: path.join(__dirname, '/src/css'),
            image: path.join(__dirname, '/src/image'),
            script: path.join(__dirname, '/src/script'),
            html: path.join(__dirname, '/src/html'),
            assets: path.join(__dirname, 'src'),
            root: path.join(__dirname, 'node_modules')
        }
    },
    externals: [
        { apiready: "window.apiready" },
        { api: "window.api" }
        // { MYAPP: "window.APP" }
    ],
    module: {
        noParse: /scr\/(image|css|script\.*)/,
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader?cacheDirectory=true',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader?cacheDirectory=true',
                    options: {
                        root: path.resolve(__dirname, 'src'),
                        attrs: false
                        //attrs: ['img:src', 'link:href']
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg|svgz)(\?.+)?$/,
                exclude: /iconfont\.svg/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'image/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                include: /fonts/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'css/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        // 复制静态资源
        //new CopyWebpackPlugin(assetsArr)
    ],
    // 是否生成路径文件
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval'
};


// 打包HTML
htmls.forEach(function(pathname) {

    let fileBasename = pathname;

    // 带app的html则使用文件夹名字
    let index = pathname.indexOf('app');
    if ( ~index && index == pathname.length - 3) {
        fileBasename = pathname.substring(0, pathname.length - 4);
    }
    var conf = {
        cache: true,
        inject: false,
        chunks: [],
        hash: process.env.NODE_ENV === 'production' ? false : true,
        filename: fileBasename + '.html', //生成的html存放路径，相对于path
        template: 'src/' + pathname + '.html', //html模板路径
    };
    
    if (~chunks.indexOf(fileBasename)) {
        conf.inject = 'body';
        conf.chunks = [fileBasename];
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
    else {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new HtmlWebpackPlugin(conf));
        }
        else {
            assetsArr.push({ from: path.resolve(__dirname, './src/' + pathname + '.html'), to: path.resolve(__dirname, './dist/' + pathname + '.html')})
        }
    }
    
});

config.plugins.push(new CopyWebpackPlugin(assetsArr));

module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = false;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
               warnings: false
            }
        }),
        // 压缩html
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}

if(module.hot){
    module.hot.accpet() //接受模块更新的事件，同时阻止这个事件继续冒泡
 }