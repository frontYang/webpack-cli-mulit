// webpack生产环境打包配置
const merge = require('webpack-merge')
const common = require('./webpack.common')
const utils = require('./utils')
const config = require('./config').prod
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const getHtmlPlugins = utils.getHtmlPlugins('src/views/**/*.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  // 输出
  output: {
    path: utils.resolve('./dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },

  // 优化
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    // 清除打包目录
    new CleanWebpackPlugin(),

    // 提取css文件
    // DOC: https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),

    // 优化css 删除可能重复的CSS
    // DOC: https://github.com/NMFR/optimize-css-assets-webpack-plugin
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),

    // 压缩js
    // DOC: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    new UglifyJSPlugin({
      sourceMap: true
    }),

    ...getHtmlPlugins

    // 可视化性能面板
    // new BundleAnalyzerPlugin()
  ]
}, config)
