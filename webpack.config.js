const path = require('path');
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV == "production";

const config = {
    target:"node",
    mode:"development",
    entry: "./src/index.ts",
    devtool: "source-map",
    output: {
      filename: 'bundle.cjs',
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      open: true,
      host: "localhost",
    },
    plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
    module: {
      rules: [
          {
          test: /\.node$/,
          loader: "node-loader",
          },
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset",
        },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

module.exports = config