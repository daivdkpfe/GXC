var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const IS_BUILD = process.env.NODE_ENV === 'production';
const IS_BUILD = true;
// const OUTPUT = './public/';


// 处理文件
function getFileLoader(folder) {
    var fileLoaderOption = {
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: `${folder}/`
        }
    };

    return fileLoaderOption;
}

var css = {
    loader: "css-loader",
    options: {
        url: true
    }
}

module.exports = {
    entry: {
        djs:'./src/djs.js'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/public/',
        filename: '[name].js',
        library: 'gxc'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {},
                extractCSS: false
                    // other vue-loader options go here
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: !!!IS_BUILD ? ['style-loader', 'css-loader', 'less-loader'] : ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [css, "less-loader"]
            })
        }, {
            test: /\.css$/,
            use: !!!IS_BUILD ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [css]
            })
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [getFileLoader('font')]
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: [getFileLoader('image')]
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new ExtractTextPlugin(`/css/[name].css`),
    ]
}