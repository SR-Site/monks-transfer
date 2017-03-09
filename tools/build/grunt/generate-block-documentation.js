module.exports = function( grunt, options )
{
	return {
		options: {
			'input': '<%= sourceDir %>inc/script/app/component/block/',
			'output': '<%= base %>tools/block-documentation/',
			'exampleBlockIdLabel': 'id'
		},
		default: {}
	};
};