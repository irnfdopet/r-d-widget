const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // Disable CSS extraction into separate file
  // css: {
  //   extract: false
  // },
  chainWebpack: config => {
    // config.entryPoints.clear(); // Clear all entry points

    config.entry('vetstoria-widget').add('./src/vetstoria-widget.js');

    config.output.filename('js/[name].js');

    config.optimization.delete('splitChunks');
  }
})
