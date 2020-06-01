const path = require("path");

// Configure HTMLWebpack plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body",
});

// Configure BrowserSync
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const BrowserSyncPluginConfig = new BrowserSyncPlugin(
  {
    host: "localhost",
    port: 3000,
    proxy: "http://localhost:8080/",
  },
  {
    reload: false,
  }
);

/* Configure ProgressBar */
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const ProgressBarPluginConfig = new ProgressBarPlugin();

// Configure Clear
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Export Configuration
module.exports = {
  mode: "development",
  entry: ["./src/main.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    HTMLWebpackPluginConfig,
    BrowserSyncPluginConfig,
    ProgressBarPluginConfig,
    new CleanWebpackPlugin(),
  ],
};
