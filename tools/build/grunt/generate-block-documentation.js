module.exports = function( grunt, options )
{
	return {
		options: {
			'input': '<%= sourceDir %>inc/script/app/component/block',
			'output': '<%= base %>tools/block-documentation/'
		},
		placeholderValues: {
			'string': 'Lorem ipsum dolor sit amet',
			'boolean': true,
			'number': 1
		},
		default: {}
	};
};