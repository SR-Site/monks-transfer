module.exports = function (grunt, options)
{
	return {
		unit: {
			configFile: 'tools/test/karma.conf.js',
			port: 9999,
			singleRun: true,
			browsers: ['PhantomJS'],
			logLevel: 'ERROR'
		},
		watch: {
			configFile: 'tools/test/karma.conf.js',
			port: 9999,
			singleRun: false,
			autoWatch: true,
			browsers: ['PhantomJS'],
			logLevel: 'ERROR'
		}
	}
}