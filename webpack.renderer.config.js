const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push(
    {
        test: /\.tsx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    },
    {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    }
);

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.svg']
  },
};
