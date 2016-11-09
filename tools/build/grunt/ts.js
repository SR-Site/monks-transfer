module.exports = function (grunt, options)
{
	return {
		default: {
			tsconfig: '<%= sourceDir %>inc/script/tsconfig.json',

			// The source TypeScript files, http://gruntjs.com/configuring-tasks#files
			src: ['<%= sourceDir %>inc/script/**/*.ts'],
			// Use to override the default options, http://gruntjs.com/configuring-tasks#options
			options: {
				failOnTypeErrors: true,
				fast: 'never'
			}
		}
	};
};