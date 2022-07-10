// const webpack = require("webpack");
// const CopyPlugin = require("copy-webpack-plugin");

const config = {
  output: {
    publicPath: "/",
  },
  entry: {
    frontend: './src/frontend.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            ignore: []
          },
        },
      },
      // {
      //   test: /\.css$/i,
      //   use: [{
      //     loader: "style-loader",
      //     options: {
      //       insert: () => {}
      //     }
      //   }, {
      //     loader: "css-loader",
      //     options: {
      //       modules: {
      //         localIdentName: '[path]-[name]_[local]'
      //       },
      //     },
      //   }],
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CopyPlugin({
    //     patterns: [
    //         { from: './src/favicon.ico' },
    //     ]
    // })
  ]
};

module.exports = config;