module.exports = function( grunt, options )
{
	return {
		options: {
			'tmpFolder': '<%= base %>tools/temp',
			'input': '<%= sourceDir %>inc/script/app/component/block',
			'output': '<%= base %>tools/block-documentation/'
		},
		default: {}
	};
};