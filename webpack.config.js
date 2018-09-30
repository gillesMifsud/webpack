const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ENV = process.env.NODE_ENV;
const dev = process.env.NODE_ENV === "dev";

let cssLoaders = [
    { loader: 'css-loader', options: {importLoaders: 1} },
    { loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: (loader) => [
                require('postcss-import')({root: loader.resourcePath}),
                require('postcss-preset-env')(),
                require('autoprefixer')({
                    browsers: ["last 4 versions", "ie > 10"]
                })
            ]
        }
    }
];

let config = {
    watch: dev,
    mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: './src/assets/js/app.js',
    output: {

        // options related to how webpack emits results
        path: path.resolve(__dirname, "public/assets"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "bundle.js", // string    // the filename template for entry chunks
        publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [/node_modules\/(?!(foundation-sites)\/).*/, /node_modules/],
            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: dev ? '[name].css' : '[name].[hash].css',
            chunkFilename: dev ? '[id].css' : '[id].[hash].css',
        })
    ],
    optimization: {
        minimizer: []
    },
    performance: {
        hints: false
    },
};

module.exports = (env, argv) => {

    if (argv.mode === 'development') {
        config.devtool = 'cheap-eval-source-map';
        config.watch = true;
        config.performance.hints = "warning";
    }

    if (argv.mode === 'production') {
        config.optimization.minimizer.push(
            new uglifyJsPlugin({
                sourceMap: true,
                test: /\.js(\?.*)?$/i,
            })
        );
        config.performance.hints = false;
    }

    return config;
};