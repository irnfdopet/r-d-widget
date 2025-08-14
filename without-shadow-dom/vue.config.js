const { defineConfig } = require('@vue/cli-service')

function enableShadowCss(config) {
  const configs = [
    config.module.rule('vue').use('vue-loader'),
  ];
  // based on common rules returned by `vue inspect`
  const ruleSets = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
  const ruleNames = ['vue-modules', 'vue', 'normal-modules', 'normal'];

  ruleSets.forEach((ruleSet) => {
    if (config.module.rules.store.has(ruleSet)) {
      ruleNames.forEach((rName) => {
        if (config.module.rule(ruleSet).oneOfs.store.has(rName)) {
          if (config.module.rule(ruleSet).oneOf(rName).uses.store.has('vue-style-loader')) {
            configs.push(config.module.rule(ruleSet).oneOf(rName).use('vue-style-loader'));
          }
        }
      });
    }
  });
  if (!process.env.BUILD_MODE) {
    process.env.BUILD_MODE = config.store.get('mode');
  }
  configs.forEach((c) => c.tap((options) => {
    options.shadowMode = true;
    return options;
  }));
}

module.exports = defineConfig({
  transpileDependencies: true,

  // Disable filename hashing for web component builds
  filenameHashing: process.env.VUE_APP_BUILD_TARGET === 'wc-v4' ? false : true,

  // Conditionally set the output directory based on the build target
  outputDir: process.env.VUE_APP_BUILD_TARGET === 'wc' ? 'dist/wc' : 'dist',

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
    if (process.env.VUE_APP_BUILD_TARGET === 'wc') {
      config.entry = {
        'vetstoria-widget': './src/vetstoria-widget.js' // Web component entry
      };
    }
    if (process.env.VUE_APP_BUILD_TARGET === 'wc-v4') {
      config.entry = {
        'vetstoria-widget': './src/vetstoria-widget-v4.js' // Web component entry
      };
    }
  },

  // chainWebpack is for more granular control over webpack rules, loaders, etc.
  chainWebpack: config => {
    // enableShadowCss(config);

    // Remove splitChunks optimization for web component builds
    if (process.env.VUE_APP_BUILD_TARGET === 'wc-v4') {
      config.optimization.delete('splitChunks');
    }
  },
  css: {
    // sourceMap: true,
    // extract: false,
  },
})