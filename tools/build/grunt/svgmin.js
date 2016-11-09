module.exports = function (grunt, options)
{
	return {
		'dist': {
			files: [
				{
					expand: true,
					cwd: '<%= base %>asset/svg',
					src: ['*.svg'],
					dest: '<%= base %>asset/svg/svgmin'
				}
			]
		}
	};
};