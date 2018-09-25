export default {
  extraBabelPlugins: [
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
  define: {
    'process.env.API_ENV': process.env.API_ENV,
  },
  publicPath: '/',
  hash: true,
}
