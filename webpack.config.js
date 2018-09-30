const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ENV = process.env.NODE_ENV;

// https://www.youtube.com/watch?v=g11Pty544zo&list=PLjwdMgw5TTLVzGXGxEBdjwHXCeYnBb7n8&index=5
// 9min

let config = {
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
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
                    },
                    'sass-loader'
                ]
            }
        ]
    },
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