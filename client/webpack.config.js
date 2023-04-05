const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
        new WebpackPwaManifest({
          name: 'My Progressive Web App',
          short_name: 'MyPWA',
          start_url: '/',
          display: 'standalone',
          icons: [
            {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('icons', 'ios'),
              ios: true
            },
            {
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('icons', 'android')
            }
          ]
        }),
        new InjectManifest({
          swSrc: './src-sw.js',
          swDest: 'src-sw.js',
          exclude: [/\.map$/, /manifest\.json$/]
        })
      ],
    module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}

  }
};