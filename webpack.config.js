const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('./node_modules/eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            { 
                test: /\.tsx?$/, 
                use: "ts-loader",
                exclude: /node_modules/,
            },
            { 
                test: /\.js$/,
                loader: "source-map-loader"
            },
            // {
            //     test: /\.(html)$/,
            //     use: ['html-loader'],
            // },
            {
                test: /.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            assetModuleFilename: '[file]'
        }),
        new CleanWebpackPlugin(),
        new EslintPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
              {
                from: '**/*',
                context: path.resolve(__dirname, 'src'),
                globOptions: {
                  ignore: [
                    '**/*.js',
                    '**/*.ts',
                    '**/*.scss',
                    '**/*.sass',
                    '**/*.html',
                  ],
                },
                noErrorOnMissing: true,
                force: true,
              }
            ],
          }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');
    
    return merge(baseConfig, envConfig);
};
