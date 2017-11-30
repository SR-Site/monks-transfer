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
const cmd = require('node-cmd');

const spinner = ora('building for production...');
spinner.start();

// empty build folder because webpack-cleanup-plugin doesn't remove folders
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
		const versionNumber = fs.readdirSync(inputPath).shift();

		// Empty the old version folder and copy the new one
		rimraf(outputPath, function () {
			// Copy the build code
			ncp(inputPath, outputPath, function() {
				// Modify the settings file with the new version
				const drupalSettings = path.resolve(config.build.drupalSettings);
				// Read the settings file
				fs.readFile(drupalSettings, 'utf8', function(error, content) {
					// Create build the new version line
					const target = `$settings['mm_deployment_version'] = '${versionNumber}'; // [deploytool]`
					// Replace the settings line
					const newContent = content.replace(/\$settings\['mm_deployment_version'](.*?)\[deploytool]/i, target);
					// Write the new content to the settings file
					fs.writeFile(drupalSettings, newContent, function() {
						// Run drush to clear the cache
						cmd.run('cd ../drupal/docroot && ../vendor/drush/drush/drush cr');
					});
				});
			});
		});

	}
	console.log();
	console.log(chalk.blue('You can preview your build by running:'), chalk.blue.bold('yarn preview'));
	console.log(chalk.blue('You can analyze your build by running:'), chalk.blue.bold('yarn analyze'));
	console.log();
});
