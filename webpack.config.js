// Generated using webpack-cli https://github.com/webpack/webpack-cli
/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const config = {
	entry: './src/index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		open: true,
		host: 'localhost',
		hot: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
	// ignored the warning on deprecated scss func
	ignoreWarnings: [
		{
			module: /css/,
		},
	],
	module: {
		rules: [
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
			{
				test: /\.(scss)$/,
				use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ],
              },
            },
          },
          {
            loader: 'sass-loader'
          },
        ],
			}
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';


		config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

	} else {
		config.mode = 'development';
	}
	return config;
};
