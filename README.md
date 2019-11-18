# 简单的页面打包配置

[X] 区分环境
[X] scss
[X] postcss
[X] es6
[X] typescript
[X] 图片&字体
[X] eslint




```
# 本地环境
yarn serve

# 构建
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
  - main.js (入口文件)
  - index.html (html模板)
- babel.config.js (babel配置)
- postcss.config.js (postcss 配置)

```