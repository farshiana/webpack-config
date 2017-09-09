const webpack                 = require('webpack');
const path                    = require('path');
const ExtractTextPlugin       = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin       = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Visualizer              = require('webpack-visualizer-plugin');
const OfflinePlugin           = require('offline-plugin');

// Get commit's hash (only in git directory!)
const ENV = process.env.NODE_ENV;
const COMMIT_HASH = (ENV === "dev") ? ENV : require('child_process').execSync('git rev-parse --short HEAD').toString();
const minify = (ENV === "prod");

const plugins = [
	// Insert all node_modules in the vendor module
	new webpack.optimize.CommonsChunkPlugin({
		name: 'vendor',
		minChunks: ({ resource }) => /node_modules/.test(resource),
	}),

	// Create manifest file
	new webpack.optimize.CommonsChunkPlugin('manifest'),

	// Add css to template
	new ExtractTextPlugin({
		filename: 'style.css',
		allChunks: true
	}),

	// Pass variables to template
	new HtmlWebpackPlugin({
		hash       : true,
		template   : 'src/index.ejs',
		environment: ENV
	}),

	// Global variables
	new webpack.DefinePlugin({
		ENV        : JSON.stringify(ENV),
		COMMIT_HASH: JSON.stringify(COMMIT_HASH)
	}),

	// Global modules
	// new webpack.ProvidePlugin({}),

	// Service-worker for progressive app
	new OfflinePlugin()
];

// Visualize modules size
if(ENV === "dev"){
	plugins.push(new Visualizer());
}

if (minify) {
	plugins.push(
		// Minify js
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false // remove comments
			},
			parallel: { // increase speed
				cache: true,
				workers: 2
			}
		}),

		// Minify css
		new OptimizeCssAssetsPlugin()
	);
}

module.exports = {
	// Entry file
	entry: {
		bundle: './src/js/index.js'
	},

	// Output bundles
	output: {
		path      : path.join(__dirname, 'dist'),
		filename  : '[name].' + COMMIT_HASH + '.js',
		publicPath: ""
	},

	resolve: {
		alias: {
			Source     : path.resolve(__dirname, 'src'),
			App        : path.resolve(__dirname, 'src/js/app'),
			Helpers    : path.resolve(__dirname, 'src/js/helpers'),
			Styles     : path.resolve(__dirname, 'src/scss'),
			Fonts      : path.resolve(__dirname, 'src/fonts'),
			Assets 	   : path.resolve(__dirname, 'src/assets')
		},
	},

	module: {

		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				// postcss-loader for browsers compatibility
				test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader', 'postcss-loader']
				})
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
					context: 'src'
				}
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					name: '[path]/[name].[ext]',
					context: 'src'
				}
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				// Manifest for progressive app
				test: /manifest.json$/,
				loader: 'file-loader',
				options: {
					name: 'manifest.json'
				}
			}
		]
	},

	plugins: plugins
};
