const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: {
      theme: ['./src/index.js', './src/styles/main.scss'],
    },
    output: {
      filename: '[name].js', // -> theme.js
      path: path.resolve(__dirname, 'assets'),
      clean: false, // Shopify assets folder must not be wiped unexpectedly
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: [['@babel/preset-env', { targets: 'defaults' }]] },
          },
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: !isProd, url: false } },
            { loader: 'postcss-loader', options: { sourceMap: !isProd } },
            { loader: 'sass-loader', options: { sourceMap: !isProd } },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css', // -> theme.css
      }),
    ],
    devtool: isProd ? false : 'source-map',
    stats: 'minimal',
    watchOptions: { ignored: /node_modules/ },
  };
};