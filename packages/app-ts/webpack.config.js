var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const getPreprocessor = require('svelte-preprocess');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDevBuild = mode !== 'production';

const cssConfig = {
  test: /\.(sa|sc|c)ss$/,
  exclude: /node_modules/,
  use: [
    'isomorphic-style-loader',
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
  ],
};

// const sveltPreprocess = autoPreprocess({
//   postcss: true,
//   scss: false,
//   stylus: false,
//   typescript: false,
//   coffeescript: false,
//   less: false,
//   pug: false,
// });

console.log('mode', mode);
const postcssPlugins = (purge = false) => {
   return [
     require("postcss-import")(),
     require("postcss-url")(),
     require("postcss-nesting")(),
     require("postcss-input-range")(),
     require("postcss-custom-properties")({
       importFrom: "../smelte/src/utils/cssVars.js"
     }),
     require("autoprefixer")(),
     require("tailwindcss")("./tailwind.config.js"),
     purge &&
       require("cssnano")({
         preset: "default"
       }),
     purge &&
       require("@fullhuman/postcss-purgecss")({
         content: ["./**/*.svelte"],
         extractors: [
           {
             extractor: content => {
               const fromClasses = content.match(/class:[A-Za-z0-9-_]+/g) || [];
 
               return [
                 ...(content.match(/[A-Za-z0-9-_:\/]+/g) || []),
                 ...fromClasses.map(c => c.replace("class:", ""))
               ];
             },
             extensions: ["svelte"]
           }
         ],
         whitelist: [
           "html",
           "body",
           "ripple-gray",
           "ripple-primary",
           "ripple-white",
           "cursor-pointer",
           "navigation:hover",
           "navigation.selected",
           "outline-none",
           "text-xs",
           "transition"
         ],
         whitelistPatterns: [
           /bg-gray/,
           /text-gray/,
           /yellow-a200/,
           /language/,
           /namespace/,
           /token/,
           // These are from button examples, infer required classes.
           /(bg|ripple|text|border)-(red|teal|yellow|lime|primary)-(400|500|200|50)$/
         ]
       })
   ].filter(Boolean);
};

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
        exclude: ['/node_modules/', '/index.svelte']
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
        smelte: path.resolve(__dirname, '../smelte/src'),
        components: path.resolve(__dirname, '../smelte/src/components'),
        utils: path.resolve(__dirname, '../smelte/src/utils')
    }
  },
  performance: {
    hints: false
  },

  plugins: [
    new MiniCssExtractPlugin('main.css'),
    // new webpack.optimize.SplitChunksPlugin({
    //   name: "formgrid",
    //   minChunks: Infinity,
    // }),
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
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: false,
      })
    ]
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