var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: ['babel-polyfill','./es6/main.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            //{
            //    test: /\.js$/,
            //    loaders: ['es3ify-loader']
            //},
            {
                loader: 'babel-loader',
                test: /\.js$/,
                //test: path.join(__dirname, 'es6'),
                query: {
                    presets: ['es2015',"react"]
                    //plugins : [
                    //    'transform-es3-member-expression-literals',
                    //    'transform-es3-property-literals',
                    //]
                }

            }

        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};