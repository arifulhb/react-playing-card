const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  entry: {
    vendor: ['@babel/polyfill', 'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'lodash', 'react-router-dom'],
    app: ['./resources/src/client/index.js']
  },
  output: {
    path: path.resolve(__dirname, './public/dist/'),
    filename: '[name].bundle.js',
  },
//   optimization: {
//     splitChunks: {
//       cacheGroups: {
//         vendor: {
//           chunks: 'initial',
//           name: 'vendor',
//           test: 'vendor',
//           enforce: true
//         },
//       }
//     },
//     runtimeChunk: true
//   },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        },
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      publicPath: 'dist/',
      fileName: './../mix-manifest.json'
    })
  ],
};
