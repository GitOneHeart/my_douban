var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  // 打包的入口文件配置
  entry: path.join(__dirname, './main.js'),
  // 打包之后程序的出口
  output: {
    // 出口文件的输出路径
    path: path.join(__dirname, 'dist'),
    // 出口文件的文件名
    filename: 'bundle.js'
  },
  // 用来配置文件解析
  module:{
    // 文件处理的规则
    rules: [
      // 处理css文件的规则  test找一下当前工程里有没有某种类型的文件
      { test: /\.css$/ , use: ['style-loader', 'css-loader']},
      // 处理scss文件    sass-loader 依赖于 node-sass
      { test: /\.scss$/ , use: ['style-loader', 'css-loader', 'sass-loader'] },
      // // 处理图片文件   url-loader 处理图片会对图片进行base64编码，如果不想编码。加一个limit参数
      { test: /\.(png|bmp|jpg|jpeg)$/, use:[ 'url-loader?limit=1000' ] },
      // 处理JS文件中的高级语法  node_modules文件夹里有很多js文件，不需要我们处理，要排除
      { test: /\.js$/, use:['babel-loader'], exclude:/node_modules/ },
      { test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file-loader' }
    ]
  },
  // 配置开发服务器
  devServer:{
    // 配置自动打开浏览器
    open: true,
    // 配置端口号
    port: 9090,
    // 配置热部署热更新  还需要配置一个插件
    hot: true,
    // 配置首页 如果服务器默认找不到要打开的首页，可以手动指定
    // openPage: 'index.html'
  },
  // 配置webpack的插件
  plugins:[

    // 热部署热替换的插件
    new webpack.HotModuleReplacementPlugin(),
    // 配置html虚拟化的节点
    new htmlWebpackPlugin({
      // 指定虚拟化html的模板文件
      template: path.join(__dirname, './src/index.html'),
      // 指定生成的html文件的名称
      // filename: 'index.html'
    }),
 
  ]
}