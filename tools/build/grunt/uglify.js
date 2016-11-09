module.exports = function(grunt, options)
{
	return {
		release: {
			options: {
				sourceMap: options.exportSourceMaps,
				sourceMapIncludeSources: true,
				sourceMapName: function(val)
				{
					return val.replace(/script/gi, 'sourcemap') + '.map';
				},
				compress: {
					global_defs: {
						RELEASE: true,
						DEBUG: false
					}
				},
				preserveComments: function(node, comment)
				{
					return (
						comment.value.substr(0, 1) == '!'
						|| comment.value.indexOf('@preserve') != -1
						|| comment.value.indexOf('@license') != -1
						|| comment.value.indexOf('@licence') != -1
					);
				}
			},
			files: [{
				expand: true,
				cwd: '<%= buildVersionDir %>/inc/script',
				src: '**/*.js',
				dest: '<%= buildVersionDir %>/inc/script'
			}]
		}
	};
};