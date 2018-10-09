export default {
  extraBabelPlugins: [
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
  define: {
    'process.env.API_ENV': process.env.API_ENV,
  },
  html: {
    template: './src/index.ejs',
  },
  publicPath: '/',
  hash: true,
}
