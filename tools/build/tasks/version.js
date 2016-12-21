module.exports = function(grunt)
{
	var fs = require('fs-extra');

	grunt.registerMultiTask('version', 'Apply versioning to the build folder', function()
	{
		var sourceIndex = grunt.config.data.buildDir + 'deploy/htdocs/index.php';
		var targetIndex = grunt.config.data.buildDir + 'deploy/htdocs/index.php';
		var done = this.async();
		var deployDate = Math.round(+new Date() / 1000);

		fs.move(
			sourceIndex,
			targetIndex,
			function()
			{
				// Remove old folders
				// deleteFolderRecursive(grunt.config.data.buildDir + 'deploy/htdocs/version/');

				// Read the index file contents
				var indexFileContent = grunt.file.read(targetIndex);

				grunt.file.write(
					targetIndex,
					indexFileContent

						// Replace version number
						.replace(/(src|\d+)(.*\[deploytool])/gi, deployDate + '$2')
				);

				// move version folder to temp folder to avoid infinite loop
				fs.move(
					grunt.config.data.buildDir + '/deploy/htdocs/version/src/',
					grunt.config.data.buildDir + '/temp',
					function()
					{
						//move version folder to final location
						fs.move(
							grunt.config.data.buildDir + '/temp',
							grunt.config.data.buildDir + '/deploy/htdocs/version/' + deployDate,
							function()
							{
								done();
							}
						);
					}
				);
			});
	});

	function deleteFolderRecursive(path)
	{
		if(fs.existsSync(path))
		{
			fs.removeSync(path);
		}
	}
};
