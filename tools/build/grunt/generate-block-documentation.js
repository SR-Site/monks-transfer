module.exports = function( grunt, options )
{
	return {
		options: {
			'input': {
				'folder': '<%= sourceDir %>inc/script/app/component/block/',
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