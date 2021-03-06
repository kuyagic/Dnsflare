const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const TerserPlugin = require('terser-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')

const env = {

}

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

export default {
    context: path.resolve(__dirname, '../'),
    entry: './src/main.ts',
    mode: 'development',
    output: {
        path: resolve('build/static'),
        publicPath: '/static/',
        filename: 'build.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'postcss-loader',
                            'sass-loader',
                        ],
                    },
                    // other vue-loader options go here
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: ['\\.vue$'],
                },
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|ttf|eot|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
            // This make favicon.ico loaded
            {
                test: /\.ico$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.ts', '.vue', '.json'],
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: {
        hints: false,
    },
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env,
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'index.html',
            inject: true,
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([
            { from: 'static', to: '../' },
        ]),
    ],
}
