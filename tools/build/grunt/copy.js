module.exports = function (grunt, options)
{
	return {
		// copy files to builddir that need processing by grunt (and should be copied back by the deploytool or uploaded manually)
		'versioning': {
			nonull: true,
			src:  'deploy/htdocs/index.php',
			dest: '<%= buildDir %>'
		},
		'mock-api': {
			src: ['deploy/htdocs/api/mock/**/*.*', 'deploy/htdocs/api/mock/*.*'],
			dest: '<%= buildDir %>'
		},
		'require-files': {
			expand: true,
			cwd: '<%= sourceDir %>inc/script/',
			src: [
				'vendor/mapbox/*.*'
			],
			dest: '<%= buildDir %>/version/inc/script/'
		},
		'dotfiles': {
			files: [{
				expand: true,
				cwd: 'deploy/htdocs/',
				src: [
					'.*',
					'favicon.ico',
					'index.php',
					'config.core.php',
					'robots.txt'
				],
				dest: '<%= buildDir %>/deploy/htdocs/'
			}]
		}
	};
};