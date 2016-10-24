/**
 * Created by YikaJ on 15/6/16.
 */
'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        bundle: "./src/entry.js",
        list: "./src/entry.js"
    },
    devServer: {
        contentBase: "./",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    devtool: 'cheap-module-source-map',//配置生成Source Maps，选择合适的选项  eval-source-map
    output: {
        path: path.join(__dirname, 'out'),
        publicPath: './out/',
        filename: "[name].js"
    },
    externals: {
        'react': 'React'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx?harmony!babel", include: /src/},
            //{ test: /\.css$/, loader: "style!css"},
            //{ test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{ test: /\.scss$/, loader: "style!css!sass"},
            //{ test: /\.(png|jpg|gif)$/, loader: "url?limit=1118192"},
            //{ test: /\.svg$/, loader: "url?limit=8192"}
        ]
    }
    //,plugins: [
    //    new ExtractTextPlugin("main.css"),
    //    new webpack.optimize.CommonsChunkPlugin("init.js")
    //]

    //plugins:[
    //    new HtmlWebpackPlugin({
    //        filename: __dirname+'/build/html/login-build.html',
    //        template:__dirname+'/src/tpl/login.html',
    //        inject:'body',
    //        hash:true
    //    }),
    //
    //    new HtmlWebpackPlugin({
    //        filename: __dirname+'/build/html/index-build.html',
    //        template:__dirname+'/src/tpl/index.html',
    //        inject:'body',
    //        hash:true
    //    }),
    //
    //    // 拆分插件
    //    new webpack.optimize.CommonsChunkPlugin({
    //        name:'user', // 上面入口定义的节点组
    //        filename:'build-user.js' //最后生成的文件名
    //    }),
    //
    //    // css抽取
    //    new extractTextPlugin("[name].css"),
    //]
};