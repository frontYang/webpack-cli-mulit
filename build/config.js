// 基本配置项
const utils = require('./utils')

module.exports = {
  // 公用
  common: {
    output: {
      path: utils.resolve('dist'),
      publicPath: '/'
    }
  },

  // 开发环境
  dev: {
    devServer: {
      port: 8081,
      contentBase: utils.resolve('dist'),
      proxy: {
        /* '/api': {
          target: 'http://localhost:8081',
          pathRewrite: {
            '^/api': ''
          }
        } */
      }
    }
  },

  // 生产环境
  prod: {
    output: {
      path: utils.resolve('dist')
    }
  }
}
