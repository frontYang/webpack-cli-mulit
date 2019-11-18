// webpack开发环境打包配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').dev
const getHtmlPlugins = utils.getHtmlPlugins('src/views/**/*.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    compress: true,
    hot: true, // 开启热更新

    // 监听html文件刷新
    before(app, server, compiler) {
      const watchFiles = ['.html']
      compiler.hooks.done.tap('done', () => {
        const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes)

        if (this.hot && changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))) {
          server.sockWrite(server.sockets, 'content-changed')
        }
      })
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...getHtmlPlugins
  ]
}, config)
