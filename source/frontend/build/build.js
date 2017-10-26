// https://github.com/shelljs/shelljs
require('shelljs/global');

const buildLocal = process.argv.indexOf('--local') != -1 || false

const config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const ncp = require('ncp');
const rimraf = require('rimraf');

const spinner = ora('building for production...');
spinner.start();

//empty build folder because webpack-cleanup-plugin doesn't remove folders
fs.emptyDirSync(webpackConfig.output.path);

webpack(webpackConfig, function (err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false,
			reasons: false
		}) + '\n');

	if(buildLocal) {
		const inputPath = path.resolve('dist/version')
		const outputPath = path.resolve(config.build.drupalVersion);

		// Empty the old version folder and copy the new one
		rimraf(outputPath, function () {
			ncp(inputPath, outputPath);
		});
	}
	console.log();
	console.log(chalk.blue('You can preview your build by running:'), chalk.blue.bold('yarn preview'));
	console.log(chalk.blue('You can analyze your build by running:'), chalk.blue.bold('yarn analyze'));
	console.log();
});
