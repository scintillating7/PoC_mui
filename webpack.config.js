const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const basename = process.env.BASENAME || '/';
const pathPrefix = basename.endsWith('/') ? basename.slice(0, basename.length - 1) : basename;

const plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.EnvironmentPlugin({ MOCK_STORE: null }),
  new webpack.EnvironmentPlugin({ BASENAME: '/' }),
  new webpack.DefinePlugin({ // <-- key to reducing React's size
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
      WORKSPACE_TIMEOUT_IN_MINUTES: process.env.WORKSPACE_TIMEOUT_IN_MINUTES || 480,
    },
  }),
  new HtmlWebpackPlugin({
    title: 'GDC Portal PoC',
    basename: pathPrefix,
    template: 'src/index.ejs',
    hash: true,
  }),
  new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
];

let optimization = {};
let devtool = false;

if (process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'auto') {
  // optimization for production mode
  optimization = {
    splitChunks: {
      chunks: 'all',
    },
  };
} else {
  // add sourcemap tools for development mode
  devtool = 'eval-source-map';
}

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  target: 'web',
  mode: process.env.NODE_ENV !== 'dev' && process.env.NODE_ENV !== 'auto' ? 'production' : 'development',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: basename,
  },
  optimization,
  devtool,
  devServer: {
    historyApiFallback: {
      index: 'dev.html',
    },
    disableHostCheck: true,
    compress: true,
    hot: true,
    port: 9443,
    https: true,
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules\/(?!(graphiql|graphql-language-service-parser)\/).*/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.less$/,
      loaders: [
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    },
    {
      test: /\.svg$/,
      loaders: ['babel-loader', 'react-svg-loader'],
    },
    {
      test: /\.(png|jpg|gif|woff|ttf|eot)$/,
      loaders: 'url-loader',
      query: {
        limit: 8192,
      },
    },
    {
      test: /\.flow$/,
      loader: 'ignore-loader',
    },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'), // Same issue.
    },
    extensions: ['.mjs', '.js', '.jsx', '.json'],
  },
  plugins,
  externals: [{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}',
  }],
};
