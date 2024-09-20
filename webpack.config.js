const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/toPDF/bound.js', // 指定入口文件
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  
  // 配置模块解析规则
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false, // 避免 Babel 转换 import/export 语法
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/toPDF/index.html',
      filename: 'index.html',
    }),
  ],
  
  // 确保模块被当作 ES 模块处理
  resolve: {
    extensions: ['.js', '.json'],
  },
  
  devServer: {
    static: './dist',
    open: true,
    port: 9000,
    hot: true,
  },
};
