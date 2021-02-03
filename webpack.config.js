const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const banner = require("./banner.js");

const basePath = __dirname;

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  entry: {
    app: path.join(__dirname, "src", "index.tsx"), // 웹팩을 실행할 대상 파일
  },
  output: {
    path: path.join(basePath, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(basePath, "/"), // Content base
    inline: true, // Enable watch and live reload
    host: "localhost",
    port: 8080,
    stats: "errors-only",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useBabel: true,
          babelCore: "@babel/core", // needed for Babel v7
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "assets/img/[name].[ext]?[hash]",
          esModule: false,
        },
      },
    ],
  },
  // plugins: [
  //   //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
  //   new HtmlWebpackPlugin({
  //     filename: "index.html", //Name of file in ./dist/
  //     template: "./public/index.html", //Name of template in ./src
  //     hash: true,
  //   }),
  //   new MiniCssExtractPlugin({
  //     filename: "[name].css",
  //     chunkFilename: "[id].css",
  //   }),
  // ],
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "production" ? "" : "[DEV]", // 개발환경 일 때 title에 [DEV]를 붙여줌
      },
      hash: true, // 캐시 때문에 브라우저 반영이 안될 때를 대비해서 항상 반영이 되게끔 스크립트 주소에 해시값을 붙여줌.
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(), // 빌드 이전 결과물 제거해주는 플러그인.
    new webpack.BannerPlugin(banner), // 빌드된 js파일 맨 위에 주석으로 정보 입력해주는 플러그인.
    new webpack.DefinePlugin({}), // process.env.NODE_ENV 값을 쓸 수 있게끔 해주는 플러그인.
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })] // 운영 환경일 땐 min버전의 css로 세팅 해줌.
      : []),
  ],
};
