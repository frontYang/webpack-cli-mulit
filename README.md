# webpack多页面配置打包

```
#安装
yarn

#本地环境
yarn serve

#构建
yarn build

```

项目结构
```
- build (webpack配置)
  - config.js (基础配置项)
  - webpack.common.js (webpack公用配置)
  - webpack.dev.js (webpack开发环境配置)
  - webpack.prod.js (webpack 生成环境配置)
- src (开发目录)
  - assets (静态资源)
  - view (页面)
  - template (公共代码)
  - lib (不打包的库)
  - common (公共style和js)
- babel.config.js (babel配置)
- postcss.config.js (postcss 配置)

```