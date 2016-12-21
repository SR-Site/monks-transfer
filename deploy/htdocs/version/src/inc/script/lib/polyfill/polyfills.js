if (typeof console === 'undefined')
{
	window['console'] = {
		/**
		 * @param {...*} message
		 */
		log: function(message){},
		/**
		 * @param {...*} message
		 */
		debug: function(message){},
		/**
		 * @param {...*} message
		 */
		warn: function(message){},
		/**
		 * @param {...*} message
		 */
		error: function(message){},
		/**
		 * @param {...*} message
		 */
		info: function(message){}
	}
}

define([
	"require",
	"exports",

	//'lib/polyfill/polyfill.ie8',

	'lib/polyfill/polyfill.array',
	'lib/polyfill/polyfill.base64',
	'lib/polyfill/polyfill.date',
	'lib/polyfill/polyfill.function',
	'lib/polyfill/polyfill.number',
	'lib/polyfill/polyfill.object',
	'lib/polyfill/polyfill.string'

	//'lib/polyfill/polyfill.requestAnimationFrame'
], function(require, exports)
{
	exports.default = {};
});