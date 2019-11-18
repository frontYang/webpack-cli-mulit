/**
 * webpack公用打包配置
 */
const merge = require('webpack-merge')
const config = require('./config').common
const utils = require('./utils')
const publicPath = config.publicPath || '/'
const entryJs = utils.getEntry('./src/views/**/*.js')

module.exports = merge({
  // 入口
  entry: entryJs,

  // 输出
  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].js',
    publicPath: publicPath
  },

  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展，(能够使用户在引入模块时不带扩展，默认值['.wasm', '.mjs', '.js', '.json'])
    extensions: ['.tsx', '.ts', '.js']
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          outputPath: '/assets/',
          publicPath: '/assets/'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          outputPath: '/assets/',
          publicPath: '/assets/'
        }
      }
    ]
  }
}, config)
