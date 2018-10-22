const path = require('path');
const config = {
  mode:'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: {
    index: ['babel-polyfill',
      path.resolve(__dirname, '../../src/index.tsx')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../../lib'),
    library: 'test',
    libraryTarget: 'umd',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2"],
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
              require.resolve("style-loader"),
              {
                loader: "typings-for-css-modules-loader",
                options: {
                  namedexport: true,
                  camelcase: true,
                  modules: true
                }
              },
              {
                loader: require.resolve("less-loader") // compiles Less to CSS
              }
          ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ],
  },
}
module.exports = config;
