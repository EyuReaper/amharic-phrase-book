const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc: './src/custom-sw.js',
          swDest: 'service-worker.js',
        }),
      ],
    },
  },
};