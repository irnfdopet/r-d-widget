const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  // Disable filename hashing for web component builds
  filenameHashing: process.env.VUE_APP_BUILD_TARGET === 'wc-dev' ? false : true,

  // Conditionally set the output directory based on the build target
  outputDir: process.env.VUE_APP_BUILD_TARGET === 'dev' ? 'dist/wc' : 'dist',

  // Configuration for your main application build
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    }
  },

  // Configure Webpack for the web component build
  configureWebpack: config => {
    if (process.env.VUE_APP_BUILD_TARGET === 'wc-dev') {
      config.entry = {
        'vetstoria-widget': './src/vetstoria-widget.js' // Web component entry
      };
    }
  },

  // chainWebpack is for more granular control over webpack rules, loaders, etc.
  chainWebpack: config => {
    // enableShadowCss(config);

    // Remove splitChunks optimization for web component builds
    if (process.env.VUE_APP_BUILD_TARGET === 'wc-dev') {
      config.optimization.delete('splitChunks');
    }
  },
  css: {
    // sourceMap: true,
    // extract: false,
  },
})