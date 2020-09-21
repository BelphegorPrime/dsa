const path = require("path");
const rules = require('./webpack.rules');

rules.push({
  test: /\.tsx?$/,
  exclude: /(node_modules|\.webpack)/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        "presets": [["@babel/preset-env", { "targets": "last 2 electron versions" }]],
        "plugins": [
          [
            "babel-plugin-transform-builtin-extend",
            {
              "globals": ["Error", "Array"]
            }
          ],
          [
            "@babel/plugin-transform-runtime",
            {
              "regenerator": true
            }
          ]
        ]
      }
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  ]
})

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: {
    index: './src/index.ts',
    mapServer: './src/mapServer/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack/main'),
  },
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json']
  },
};