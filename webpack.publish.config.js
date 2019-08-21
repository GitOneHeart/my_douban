var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var extractTextWebpackPlugin = require('extract-text-webpack-plugin');
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  // 打包的入口文件配置
  entry: {
    main: path.join(__dirname, 'main.js'),
    vendors: ['jquery']
  },
  // 打包之后程序的出口
  output: {
    // 出口文件的输出路径
    path: path.join(__dirname, 'dist'),
    // 出口文件的文件名
    filename: 'js/bundle.js'
  },
  // 用来配置文件解析
  module: {
    // 文件处理的规则
    rules: [
      // 处理css文件的规则  test找一下当前工程里有没有某种类型的文件
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.css$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
        publicPath: '../' 
      }) },
      // 处理scss文件    sass-loader 依赖于 node-sass
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.scss$/, use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath: '../'
      }) },
      // 处理图片文件   url-loader 处理图片会对图片进行base64编码，如果不想编码。加一个limit参数
      { test: /\.(png|bmp|jpg|jpeg)$/, use: ['url-loader?limit=1000&name=images/img-[hash:6].[ext]'] },
      // 处理JS文件中的高级语法  node_modules文件夹里有很多js文件，不需要我们处理，要排除
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      {test:/.vue$/,loader:'vue-loader'}
    ]
  },
  // 配置webpack的插件
  plugins: [
    // 配置html虚拟化的节点
    new htmlWebpackPlugin({
      // 指定虚拟化html的模板文件
      template: path.join(__dirname, 'index.html'),
      // 指定生成的html文件的名称
      filename: 'index.html',
      minify: {// 压缩HTML代码
        collapseWhitespace: true, // 合并空白字符
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    // 抽取共同使用的js文件为单独的js
    new webpack.optimize.CommonsChunkPlugin({
      // 对象entry节点下，我们要抽取的js的name
      name: 'vendors',
      // 生成的js文件的名称
      filename: 'js/vendors.js'
    }),
    // 配置清除目录的插件
    new cleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({ // 优化压缩JS
      compress: {
        warnings: false // 移除警告
      }
    }),
    new webpack.DefinePlugin({ // 设置为产品上线环境 为了避免压缩报错
      'process.env.NODE_ENV': '"production"'
    }),
    // 配置抽取css文件的插件
    new extractTextWebpackPlugin("css/styles.css"),
    // 优化压缩css文件的插件
    new optimizeCssAssetsWebpackPlugin(),
    // vue的loader文件
    new VueLoaderPlugin()
  ]
}