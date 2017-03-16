module.exports = function( grunt, options )
{
	return {
		options: {
			'input': {
				'files': [
					'<%= sourceDir %>inc/script/app/data/interface/IInitData.ts'
				]
			},
			'output': '<%= base %>tools/block-documentation/',
			'exampleBlockIdLabel': 'id'
		},
		default: {}
	};
};