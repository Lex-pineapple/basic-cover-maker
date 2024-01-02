const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, "./dist")
        },
        devMiddleware: {
            publicPath: '/'
        },
        port: 8080,
        open: true,
        hot: true,
        client: {
            overlay: {
                warnings: false,
            }
        }
    },
};
