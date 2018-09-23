const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV;

let config = {
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, './public/build'),
        filename: 'bundle.js'
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    optimization: {
        minimizer: []
    },
    performance: {
        hints: ENV === 'production' ? "warning" : false
    },
};


if (ENV === "production") {
    config.optimization.minimizer.push(
        new uglifyJsPlugin({
            sourceMap: true,
            test: /\.js(\?.*)?$/i,
            include: [
                path.resolve(__dirname, 'node_modules/foundation-sites'),
                path.resolve(__dirname, 'assets')
            ],
            exclude: [/node_modules\/(?!(foundation-sites)\/).*/, /node_modules/],
        })
    )
}

module.exports = config;