const utils = require('./utils')
const Koa = require('koa')
const koa_static = require('koa-static')
const app = new Koa()
const port = 3002

const staticPath = utils.resolve('dist')

app.use(koa_static(staticPath))

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`)
})
