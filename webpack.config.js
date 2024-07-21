const path = require('path');

module.exports = {
  entry: './src/app',
  devServer: {
    host: '0.0.0.0',
    port: 4200,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '~shared': path.resolve(__dirname, 'src/shared'),
      '~entities': path.resolve(__dirname, 'src/entities'),
      '~features': path.resolve(__dirname, 'src/features'),
      '~widgets': path.resolve(__dirname, 'src/widgets'),
      '~pages': path.resolve(__dirname, 'src/pages'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
