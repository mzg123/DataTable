var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {

        index: "./webpackbuildjs/entry.js"
        ,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "./js/[name].js"
    }
    , module: {
        loaders: [
            //{ test: /\.js$/, loader: "jsx?harmony!babel", include: /src/},
            //{ test: /\.css$/, loader: "style!css"},
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")}
            , {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=image/[hash].[ext]',
                    'image-webpack'
                ]
            }
            //{ test: /\.scss$/, loader: "style!css!sass"},
            //{ test: /\.(png|jpg|gif)$/, loader: "url?limit=1118192"},
            //{ test: /\.svg$/, loader: "url?limit=8192"}
        ]
    }
    , imageWebpackLoader: {//压缩图片
        mozjpeg: {
            quality: 50
        },
        pngquant:{
            quality: 55,
            speed: 10
        },
        svgo:{
            plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    }
    ,plugins: [
        new ExtractTextPlugin("css/[name].css"),//分离css样式
        new webpack.optimize.UglifyJsPlugin({    //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']    //排除关键字
        })

    ]
};



















//var path = require('path')
//var webpack = require('webpack');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//
//module.exports = {
//    devtool: 'cheap-eval-source-map',
//    entry: [
//        'webpack-dev-server/client?http://127.0.0.1:8080',
//        'webpack/hot/dev-server',
//        "./webpackbuildjs/entry.js"
//        ,'./webpackbuildjs/main.css'
//    ],
//    output: {
//        path: path.join(__dirname, 'dist'),
//        publicPath: '../',
//        filename: "./js/[name].js"
//    },
//    plugins: [
//        new webpack.HotModuleReplacementPlugin(),
//
//        new ExtractTextPlugin("css/[name].css")//分离css样式
//    ],
//    module: {
//        loaders: [
//            //.css 文件使用 style-loader 和 css-loader 来处理
//            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader", "css-loader")}
//
//            ,{
//                test: /\.(jpe?g|png|gif|svg)$/i,
//                loaders: [
//                    'file?hash=sha512&digest=hex&name=image/[hash].[ext]'
//                ]
//            }
//            //{
//            //    test: /.(png|jpg)$/,
//            //    loader: 'url?limit=8192&name=image/[hash:8].[name].[ext]'
//            //}
//        ]
//    },
//    devServer: {
//        contentBase: './',
//        hot: true
//    }
//}