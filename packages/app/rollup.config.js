import commonjs from 'rollup-plugin-commonjs';
// import purgeCss from '@fullhuman/postcss-purgecss';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import {terser} from 'rollup-plugin-terser';
import replace from "rollup-plugin-replace";
import { string } from "rollup-plugin-string";
import json from "rollup-plugin-json";
// import config from "sapper/config/rollup.js";
import getPreprocessor from "svelte-preprocess";
import includePaths from "rollup-plugin-includepaths";
// import svelte_preprocess_postcss from 'svelte-preprocess-postcss';
// import path from "path";


// const production = !process.env.ROLLUP_WATCH;
const mode = process.env.NODE_ENV || "development";
const dev = mode === "development";

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

export default {
   input: 'src/main.js',
   output: {
      format: 'esm',
      sourcemap: true,
      name: 'app',
      dir: 'public/dist',
   },
   plugins: [
      replace({
         "process.browser": true,
         "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      string({
        include: "**/*.txt"
      }),
      json({
        includes: "**./*.json",
      }),
      svelte({
         dev: dev,
         preprocess,
        //  preprocess: {
        //     // style: svelte_preprocess_postcss(),
        //  },
         css: css => {
            css.write('public/components.css');
         },
      }),
      resolve({mainFields: ['svelte', 'module', 'main']}),
      commonjs(),
      includePaths({ paths: ["../smelte/src", "../smelte"] }),
      postcss({
          extract: true,
          plugins: postcssPlugins(!dev),
      }),
      // postcss({
      //   plugins: postcssPlugins(!dev),
      //   extract: path.resolve(__dirname, "./public/static/global.css")
      // }),
      dev && livereload('public'),
      !dev && terser(),
   ],
   watch: {
      clearScreen: false,
   },
};
