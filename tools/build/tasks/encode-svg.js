var DirectoryEncoder = require('directory-encoder');

module.exports = function(grunt)
{
	grunt.registerMultiTask('encode-svg', function()
	{
		var encodeOpts = grunt.config(this.name + '.' + this.target + '.options');
		var destination = grunt.config(this.name + '.' + this.target + '.destination');
		var files = this.files.map(function(f)
		{
			return f.src[0];
		});

		var de = new DirectoryEncoder(files, destination, encodeOpts);
		de.encode();
	});
};