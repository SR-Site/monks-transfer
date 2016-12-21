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