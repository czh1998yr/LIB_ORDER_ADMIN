const path = require("path");//引入path模块
function resolve(dir){
  return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


module.exports= {
  chainWebpack: (config) => {
    config.resolve.alias
        //set第一个参数：设置的别名，第二个参数：设置的路径
        .set('@', resolve('./src'))
        .set('components', resolve('./src/components'))
        .set('assets', resolve('./src/assets'))
        .set('views', resolve('./src/views'))
        .set('network', resolve('./src/network'))
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
  devServer: {
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: '/index.html' //与output的publicPath
    },
  },
}