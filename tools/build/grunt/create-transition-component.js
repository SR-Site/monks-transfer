module.exports = function( grunt, options )
{
	return {
		options: {
			'directories': {
				'component': '<%= sourceDir %>inc/script/app/component/',
				'templates': '<%= gruntDir %>tasks/create-transition-component/',
				'style': '<%= sourceDir %>inc/style/component/'
			},
			'styleCollectionFilename': '_component.scss'
		},
		default: {}
	};
};