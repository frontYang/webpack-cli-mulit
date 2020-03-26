const path = require('path')
const glob = require('glob')
const fs = require('fs')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 获取文件夹路径
  resolve(dir) {
    return path.resolve(__dirname, '..', dir)
  },

  /**
   * 根据目录获取入口
   * @param  {[type]} globPath [description]
   * @return {[type]}          [description]
   */
  getEntry(globPath) {
    const entries = {}
    glob.sync(globPath).forEach(function(entry) {
      const basename = path.basename(entry, path.extname(entry))
      const pathname = path.dirname(entry)
      if (!entry.match(/js\/lib\//)) {
        entries[basename] = pathname + '/' + basename
      }
    })
    return entries
  },

  /**
   * 生成html
   */
  getHtmlPlugins(globPath) {
    const htmlPlugins = []
    glob.sync(globPath).forEach(function(entry) {
      const basename = path.basename(entry, path.extname(entry))
      const pathname = path.dirname(entry)
      // if (pathname === 'common' || pathname === 'template') return

      if (!entry.match(/js\/lib\//)) {
        const htmlwebpackPlugin = new HtmlwebpackPlugin({
          // title: `${basename}`,
          template: path.resolve(__dirname, '..', fs.existsSync(`${pathname}/${basename}.ejs`) ? `${pathname}/${basename}.ejs` : 'public/index.html'),
          filename: basename === 'index' ? `index.html` : `${basename}/index.html`,
          inject: true,
          chunks: [basename],
          minify: false
          /* minify: {
            removeComments: true, // 移除注释
            collapseWhitespace: true, // 删除空格
            removeAttributeQuotes: true // 移除属性的引号
          } */
        })
        htmlPlugins.push(htmlwebpackPlugin)
      }
    })
    return htmlPlugins
  },

  /* 复制静态文件 */
  copyLib(fromPath, toPath) {
    return new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '..', fromPath),
        to: path.resolve(__dirname, '..', toPath)
      }
    ])
  }
}
