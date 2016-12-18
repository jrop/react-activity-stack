'use strict'

module.exports = {
	entry: ['./test/index.js'],
	devtool: '#sourcemap',
	output: {
		path: `${__dirname}/test`,
		publicPath: '/test/',
		filename: 'index.bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
		}],
	}
}
