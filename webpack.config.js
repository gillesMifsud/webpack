const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ENV = process.env.NODE_ENV;
const dev = ENV === "dev";

let cssLoaders = [
    { loader: 'css-loader',
        options: {
            importLoaders: 1,
            minimize: !dev
        }
    },
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
    mode: "development",
    entry: {
      app: [
          './src/assets/scss/app.scss',
          './src/assets/js/app.js']
    },
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "./public/assets"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: dev ? '[name].js' : '[name].[hash].js', // string    // the filename template for entry chunks
        publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
    },
    // Aliases
    // Ex use in js file : import css from '@assets-scss/app.scss'
    resolve: {
        alias: {
            '@assets-' : path.resolve(__dirname, 'src/assets/')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, './public')
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                enforce: 'pre',
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader'
                },
                exclude: [
                    path.resolve(__dirname, "node_modules/util"),
                    /node_modules\/(?!(foundation-sites)\/).*/,
                    /node_modules/,
                ],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: [
                    path.resolve(__dirname, "node_modules/util"),
                    /node_modules\/(?!(foundation-sites)\/).*/,
                    /node_modules/,
                ],
            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    // fallback to style-loader in development
                    MiniCssExtractPlugin.loader,
                    ...cssLoaders,
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: [
                                path.resolve(__dirname, 'node_modules/foundation-sites/scss')
                            ]
                        },
                    }
                ],
            },
            // Images & fonts, size < 8192 use base 64
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:7].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: !dev
                        }
                    }
                ]
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

// the path(s) that should be cleaned
let pathsToClean = [
    'public/assets'
];

// the clean options to use
let cleanOptions = {
    root:     path.resolve('./'),
    verbose:  true,
    dry:      false
};

module.exports = () => {

    if (dev) {
        config.watch = true;
        config.devtool = 'cheap-eval-source-map';
        config.performance.hints = "warning";
    }

    if (!dev) {
        config.optimization.minimizer.push(
            new uglifyJsPlugin({
                sourceMap: true,
                test: /\.js(\?.*)?$/i,
            })
        );
        config.performance.hints = false;
        config.plugins.push(new ManifestPlugin());
        config.plugins.push(new CleanWebpackPlugin(pathsToClean, cleanOptions));
    }

    return config;
};