const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy('/api',{
      target: 'http://192.168.13.58:5000',
      changeOrigin: true,
      pathRewrite: {'^/api':''}
    })
  )
}