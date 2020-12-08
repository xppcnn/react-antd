const CracoLessPlugin = require('craco-less');
const path = require('path');

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      '@@': pathResolve('.'),
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      // '@common': pathResolve('src/common'),
      '@components': pathResolve('src/components'),
      // '@': pathResolve('src/hooks'),
      '@pages': pathResolve('src/pages'),
      '@redux': pathResolve('src/redux'),
      '@utils': pathResolve('src/utils'),
      '@services': pathResolve('src/services'),
      // 此处是一个示例，实际可根据各自需求配置
    },
  },
  babel: {
    //用来支持装饰器
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: (devServerConfig) => {
    return {
      ...devServerConfig,
      // 服务开启gzip
      compress: true,
      proxy: {
        '/api': {
          target: 'http://localhost:7001',
          changeOrigin: true,
          xfwd: false,
          pathRewrite: {
            '^/api': '/',
          },
        },
      },
    };
  },
};
