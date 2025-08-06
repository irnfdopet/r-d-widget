// vue.config.js
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

  // Conditionally set the output directory based on the build target
  // If VUE_APP_BUILD_TARGET is 'wc', output to 'dist/wc', otherwise to 'dist'
  outputDir: process.env.VUE_APP_BUILD_TARGET === 'wc' ? 'dist/wc' : 'dist',

  // Configuration for your main application build
  pages: {
    app: {
      entry: 'src/main.js', // Your main application entry
      template: 'public/index.html',
      filename: 'index.html', // This is relative to the outputDir ('dist' in this case)
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    }
  },

  // Configure Webpack for the web component build
  configureWebpack: config => {
    // Apply this specific configuration only when building the web component
    if (process.env.VUE_APP_BUILD_TARGET === 'wc') {
      config.entry = {
        'vetstoria-widget': './src/vetstoria-widget.js' // Web component entry
      };
      // Vue CLI's --target wc and --name flags handle the output filename and chunks
      // within the specified outputDir. No need to modify config.output.filename here.
    }
  },

  // chainWebpack is for more granular control over webpack rules, loaders, etc.
  // For separating output directories, outputDir is the primary mechanism.
  chainWebpack: config => {
    // enableShadowCss(config);
  },
  css: {
    // sourceMap: true,
    // extract: false,
  },
})