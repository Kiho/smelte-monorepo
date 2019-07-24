var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const getPreprocessor = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPlugins = require("./postcss.config.js");

const mode = process.env.NODE_ENV || 'development';
const isDevBuild = mode !== 'production';

const cssConfig = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    { loader: 'postcss-loader', options: { extract: true, plugins: postcssPlugins(!isDevBuild) } },
  ],
};

console.log('mode', mode);

const preprocess = getPreprocessor({
  transformers: {
    postcss: {
      plugins: postcssPlugins()
    }
  }
});

module.exports = {
  entry: {
    'main': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  mode,
  module: {
    rules: [      
      cssConfig,
      {
        test: /\.svelte$/,
        use: { loader: 'svelte-loader', options: { 
            dev: isDevBuild, 
            preprocess,
          } 
        },
        exclude: ['/node_modules/']
      },
      { 
        test: /\.ts$/, 
        include: /src/, 
        use: 'ts-loader'
      },      
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js', '.json', '.svelte'],
    mainFields: ['svelte', 'module', 'main'],
    alias: {
      components: path.resolve(__dirname, '../smelte/src/components'),
      utils: path.resolve(__dirname, '../smelte/src/utils')
    }
  },
  performance: {
    hints: false
  },

  plugins: [
    new MiniCssExtractPlugin('main.css'),
  ]
}

if (!isDevBuild) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map', // Remove this line if you prefer inline source maps
      moduleFilenameTemplate: path.relative('./dist', '[resourcePath]') // Point sourcemap entries to the original file locations on disk
    }),
  ]);
  module.exports.optimization = {
    // minimize: true,
    // minimizer: [
    //   new UglifyJSPlugin({
    //     sourceMap: false,
    //   })
    // ]
  }
} else {
  module.exports.devtool = '#source-map';

  module.exports.devServer = {
    port: 8098,
    host: "localhost",
    historyApiFallback: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    contentBase: './dist',
    open: true,
    proxy: {
      "/api/*": "http://127.0.0.1:5002"
    }
  };
}