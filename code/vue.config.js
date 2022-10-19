const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: '../docs',
  lintOnSave:false,
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title= 'CAD的个人网站'
          return args
        })
  }
})
