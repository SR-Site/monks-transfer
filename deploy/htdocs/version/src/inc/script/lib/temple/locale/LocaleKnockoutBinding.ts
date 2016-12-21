

import CommonEvent from "lib/temple/event/CommonEvent";
import ITextFormatter from "./formatter/ITextFormatter";

import KOElementManager from "./element/KOElementManager";
import HTMLElementData from "./element/data/HTMLElementData";

import ImageElementManager from "./element/ImageElementManager";
import BackgroundImageElementManager from "./element/BackgroundImageElementManager";
import ImageElementData from "./element/data/ImageElementData";

import LowerCaseFormatter from "./formatter/LowerCaseFormatter";
import UpperCaseFormatter from "./formatter/UpperCaseFormatter";
import MaxCharsFormatter from "./formatter/MaxCharsFormatter";
import ReplaceFormatter from "./formatter/ReplaceFormatter";
import PluralFormatter from "./formatter/PluralFormatter";
import CustomFormatter from "./formatter/CustomFormatter";

import ko = require('knockout');

/**
 * The LocaleKnockoutBinding are knockout bindings to make it easier for you to
 * add localized data to your HTML. It are wrappers to the TypeScript classes
 * that are already available, the Element Managers.
 *
 * The {{#crossLink "temple.locale.element.HTMLElementManager"}}HTMLElementManager{{/crossLink}} will let you provide an HTML element and an ID from your
 * locale file. You optionally supply extra options and formatters, but we'll come
 * back to that later.
 *
 * The basic syntax is:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar');
 *
 * The manager will do two things, first it will look up the value for that ID in
 * the {{#crossLink "temple.locale.LocaleManager"}}LocaleManager{{/crossLink}} and update the `innerText` for that element with the value.
 * Secondly it will listen for update events on the {{#crossLink "temple.locale.LocaleManager"}}LocaleManager{{/crossLink}}, and when the
 * locale changes, it will update the value of your element. This will allow
 * you to dynamically switch locale, without any extra work.
 *
 * Add this TypeScript lines for every HTML element you have in your templates
 * might become a bit cumbersome, so for that reason we introduced the LocaleKnockoutBindings.
 *
 *
 * localizedText Binding
 * =====================
 *
 * Instead of writing TypeScript, you can specify the string ID in your HTML,
 * on the element you want that text to be displayed.
 *
 * The basic syntax for that is:
 *
 *      <span data-bind="localizedText: 'foo.bar'"></span>
 *
 * This will give the same result as the line above, as the localizedText binding
 * will execute that line internally. Internally it behaves the same as using
 * the normal kncokout `text` binding.
 *
 * Shorthand 'lt'
 * --------------
 *
 * There is also a shorthand syntax for the line above, that is possible trough
 * two features of the Knockout Punches extension we use.
 *
 * The syntax for that is:
 *
 *      `{ {lt:foo.bar} } (without spaces)`
 *
 * The line above will be rewritten to the following, that will be placed into the DOM:
 *
 *      <!-- ko: localizedText:foo.bar --><!-- /ko -->
 *
 * Which is basically the same as the original binding on the `<span>`, but instead
 * it is placed onto a virtual elements (HTML comment).
 *
 * Inserting HTML
 * ----------
 *
 * Now we have covered the basic, we can continue to the next step, inserting HTML
 * instead of plain text. The text above will always be inserted using the `innerText`
 * property. But what if your content is nicely formatted HTML?
 *
 * You can change the string value to an object, and set the `html` key to true:
 *
 *      <span data-bind="localizedText: {id: 'foo.bar', html: true}"></span>
 *
 * **PLEASE NOTE:** You need to use the normal element binding to make HTML work.
 * Internally this uses the knockout `html` binding, which isn't supported on
 * virtual elements (HTML comments). As the 'lt' shorthand will be rewritten
 * to use virtual elements, it can never work that way.
 *
 * **PLEASE NOTE:** If you have `<a>` tags in your HTML content, make sure you don't
 * have a surrounding `<a>` tag anywhere, as that will make the applied HTML invalid,
 * which will result in a unclear error.
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', true);
 *
 * Attributes
 * ----------
 *
 * Besides `innerText` and `innerHTML`, there are other things you might want to
 * translate, like attributes (title, data-validation, etc). This is very easy,
 * just provide the `attr` key in your object:
 *
 *      <a href="foo.html" data-bind="localizedText: {id: 'foo.title', attr: 'title'}">My Link</a>
 *
 * But, now the 'My Link' copy isn't translated, how can we do both? Well, just
 * pass an array of objects:
 *
 *      <a href="foo.html" data-bind="localizedText: [
 *          {id: 'foo.title', attr: 'title'},
 *          {id: 'foo.label'},
 *      ]"></a>
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.title', 'title');
 *      HTMLElementManager.getInstance().add(element, 'foo.label');
 *
 * Dynamic values
 * --------------
 *
 * In some cases, the string ID that you want to provide in your binding, should
 * be dynamic. Since we are working with Knockout bindings, if you are using
 * observables for those values, the bindings will be updated as soon as the value
 * of that observable changes.
 *
 *      // your viewmodel
 *      this.selectedValue = ko.observable('foo');
 *
 *      // your HTML
 *      <span data-bind="localizedText: 'menu.' + selectedValue()"></span>
 *
 * This will first show the `menu.foo` value, but if you `selectedValue('bar')`,
 * it will render the 'menu.bar' value.
 *
 * Knowing this, you can also compute the value in a loop:
 *
 *      <ul data-bind="foreach: list()">
 *          <li data-bind="localizedText: 'list.' + $data"></li>
 *      </ul>
 *
 * Dynamic lists
 * -------------
 *
 * Sometimes you have an array in your locale file, with a variable amount of items,
 * and you want to show them all.
 * You can use the {{#crossLink "temple.locale.LocaleManager/getKeys:method"}}`getKeys('foo.bar')`{{/crossLink}} method of the LocaleManager,
 * combined with the method above, to build it up:
 *
 *      <ul data-bind="foreach: localeManager.getKeys('menu.list')">
 *          <li data-bind="localizedText: 'menu.list.' + $data"></li>
 *      </ul>
 *
 * If 'menu.list' is an array, it will return numeric keys.
 *
 * Using formatters
 * ----------------
 *
 * Sometimes you want to have the inserted string displayed slightly different
 * than stored in your locale file. For this use case we have formatters.
 * Formatters can be passed as extra options in your localizedText configuration,
 * and each formatter can have (different) parameters.
 *
 * **{{#crossLink "temple.locale.formatter.LowerCaseFormatter"}}lowercase{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'lowercase'
 *          ]
 *      }"></span>
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new LowerCaseFormatter();
 *      ]);
 *
 * **{{#crossLink "temple.locale.formatter.UpperCaseFormatter"}}uppercase{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'uppercase'
 *          ]
 *      }"></span>
 *
 * You might think, I can do lowercase and uppercase in my CSS too. That's correct,
 * however, the uppercase formatter has some extra tricks. In some languages the
 * unicode mapping between lowercase and uppercase are not the same as in latin,
 * so this will result in incorrect characters. The uppercase formatter has a list
 * like this which is uses a a replacement map:
 *
 *      // greek
 *      'ά': 'Α',
 *      'έ': 'Ε',
 *      'ή': 'Η',
 *      'ί': 'Ι',
 *      'ΐ': 'Ϊ',
 *      'ό': 'Ο',
 *      'ύ': 'Υ',
 *      'ΰ': 'Ϋ',
 *      'ώ': 'Ω',
 *
 *      // german
 *      'ö': 'Ö',
 *      'ß': 'SS'
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new UpperCaseFormatter();
 *      ]);
 *
 * **{{#crossLink "temple.locale.formatter.ReplaceFormatter"}}replace{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'replace',
 *              options: {
 *                  replacements: {
 *                      gender: gender(),
 *                      count: count()
 *                  }
 *              }
 *          ]
 *      }"></span>
 *
 * The replacement object will replace the keys in the string, with the values.
 * The values can be observables (like in this example), and will update when the
 * value of the observable updates. In your translation file, variables must be
 * placed between `{}`, so in this case `"The {gender} has {count}"`.
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new ReplaceFormatter({
 *              gender: gender(),
 *              count: count()
 *          });
 *      ]);
 *
 * **{{#crossLink "temple.locale.formatter.PluralFormatter"}}plural{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'plural',
 *              options: {
 *                  replacements: {
 *                      count_dogs: dogCount(),
 *                      count_cats: catCount()
 *                  }
 *              }
 *          ]
 *      }"></span>
 *
 * Pluralisation works automatically for the Englisch language (as it has good rules
 * and only a few exceptions), but for other languages you must provide the plural
 * form yourself.
 *
 * So for your English translation file:
 *
 *      "foo": "I have {count_dogs} {dog|count_dogs} and {count_cats} {cat|count_cats}";
 *
 * And for other languages:
 *
 *      "foo": "I have {count_dogs} {dog|count_dogs|dogs} and {count_cats} {cat|count_cats|cats}";
 *
 * The syntax is `{singular|count|plural}`. As you can see, the plural formatter
 * also does the replacements of the variables (in this case the counts) in your string.
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new PluralFormatter({
 *              count_dogs: dogCount(),
 *              count_cats: catCount()
 *          });
 *      ]);
 *
 * **{{#crossLink "temple.locale.formatter.MaxCharsFormatter"}}maxchars{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'maxchars',
 *              options: {
 *                  maxChars: 10,
 *                  readMoreChars: '...',
 *                  splitOnWord: false
 *              }
 *          ]
 *      }"></span>
 *
 * If your text might be longer than the box it should fit in, and you cannot
 * use `overflow: ellipses;` in your CSS, this might be an option.
 *
 * You can provide the maximum of characters to display, provide the characters
 * to show at the cutoff, and specify if it should only split complete words.
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new MaxCharsFormatter(10, '...', false);
 *      ]);
 *
 * **{{#crossLink "temple.locale.formatter.CustomFormatter"}}custom{{/crossLink}}**
 *
 *      <span data-bind="localizedText: {
 *          id: 'foo.bar',
 *          formatters: [
 *              name: 'custom',
 *              options: {
 *                  func: function(seperator, text) {
 *                      return text.split('').join(ko.utils.unwrapObservable(seperator));
 *                  }.bind(null, customSeparator)
 *              }
 *          ]
 *      }"></span>
 *
 * The custom formatter can be used to do other things with your localized values
 * before they are displayed. You can provide a function that passes the translated
 * text as argument, and returns the modified value to display.
 *
 * In the example above it uses the `bind()` method to pass an observable (that gets
 * unwrapped to correctly use it).
 *
 * TypeScript:
 *
 *      HTMLElementManager.getInstance().add(element, 'foo.bar', false, [
 *          new CustomFormatter(text => text.split('').join(this.viewModel.customSeparator());
 *      ]);
 *
 * **virtual elements**
 *
 * As long as you don't use HTML in your output, all formatters also work within
 * virtual elements (in case you cannot use an extra span element).
 *
 * Images
 * ======
 *
 * Sometimes you have images that contain copy, or should be different in another
 * market, so they have to switch to match the current locale. This is also supported.
 *
 * In TypeScript, you would use the {{#crossLink "temple.locale.element.ImageElementManager"}}ImageElementManager{{/crossLink}}
 * and {{#crossLink "temple.locale.element.BackgroundImageElementManager"}}BackgroundImageElementManager{{/crossLink}}.
 * We also have dedicated Knockout bindings for those two.
 *
 * You can specify the image in your binding:
 *
 *      <div data-bind="localizedBgImage: 'inc/image/locale/{locale}/locale.jpg'"></div>
 *
 * Or you you already have your div styled (either inline or with a css class),
 * it can read the current style and extract the image path (currently only xx_XX format supported):
 *
 *      <div class="bg-image" data-bind="localizedBgImage: true"></div>
 *
 * And the same works for images:
 *
 *      <img data-bind="localizedImage: 'inc/image/locale/{locale}/locale.jpg'" />
 *      <img src="inc/image/locale/en_US/locale.jpg" data-bind="localizedImage: true" />
 *
 * TypeScript:
 *
 *      BackgroundImageElementManager.getInstance().add($('#bgImage1')[0], 'inc/image/locale/{locale}/locale.jpg');
 *      BackgroundImageElementManager.getInstance().add($('#bgImage1')[0]);
 *      ImageElementManager.getInstance().add($('#image1')[0], 'inc/image/locale/{locale}/locale.jpg');
 *      ImageElementManager.getInstance().add($('#image1')[0]);
 *
 * FAQ
 * ===
 *
 * What if I want to use a value from my translation file in other knockout bindings
 * -----
 *
 * Then it's not really a transition is it? It's more like a config variable.
 * You can use the {{#crossLink "temple.locale.LocaleManager/getKeys:method"}}`getString('foo.bar')`{{/crossLink}}
 * method to retrieve the value, and put it in the viewModel so your Knockout bindings can use it.
 *
 *      this.myObservable = ko.observable(LocaleManager.getInstance().getString('foo.bar'));

 * **But what if I dynamically change the language?**
 *
 * Then you should listen to the `UPDATE` event and update the observable:
 *
 *      LocaleManager.getInstance().addEventListener(CommonEvent.UPDATE, () =>
 *      {
 *          this.myObservable(LocaleManager.getInstance().getString('foo.bar');
 *      });
 *
 * **But they are translations, and I need them in other knockout bindings!**
 *
 * Ah, you're right, some bindings (like the KO options binding: http://knockoutjs.com/documentation/options-binding.html)
 * do need actual copy, but cannot be used in combination with the localizedText binding.
 *
 * Too bad, but you have to do this manually with typescript, just as the example above.
 *
 * What if I see my text appearing when I load my page
 * -----
 *
 * Then your InitLocaleTask or StartUp probably didn't wait until your language
 * files were loaded.
 *
 * Want to write tooling?
 * ======================
 *
 * Regexp to fetch translation-id's and their value
 *
 *     <([^\s]+).*data-bind=".*localizedText:\s*(["']?)([a-zA-Z0-9_-]+)\2\s*".*>(.*)</\1>
 *
 * group 3 or group 5 = ID
 * group 6 = original value
 *
 *     <([^\s]+)[^>]*data-bind="[^"]*localizedText:\s*(?:(["']?)([a-zA-Z0-9_-]+)\2|[^"]*id:\s*(["']?)([a-zA-Z0-9_-]+)\4)[^"]*"[^>]*>(.*?)</\1>
 *
 *     <([^\s]+)[^>]*
 *         data-bind="[^"]*
 *             localizedText:\s*(?:
 *                 (["']?)([a-zA-Z0-9_-]+)\2 |
 *                 [^"]*id:\s*(["']?)([a-zA-Z0-9_-]+)\4
 *             )
 *         [^"]*"
 *     [^>]*>(.*?)</\1>
 *
 * @module Temple
 * @namespace temple.locale
 * @class LocaleKnockoutBinding
 */
class LocaleKnockoutBinding
{
	constructor()
	{
		ko.bindingHandlers.localizedText = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				this._formatterString = '';

				// sets up the config object
				this.getConfig = function (va):any[]
				{
					var config:any = ko.utils.unwrapObservable(va());

					if (typeof config === 'string')
					{
						config = [
							{
								'id': config
							}
						]
					}

					if (!(config instanceof Array))
					{
						config = [
							config
						];
					}

					return config;
				};

				// gets and checks the HTML propertiy
				this.getAttr = function (el, config:{html:KnockoutObservable<any>; attr:KnockoutObservable<string>;} ):string
				{
					var attr:any = 'text';

					if ((ko.utils.unwrapObservable(config.html) == true
						|| ko.utils.unwrapObservable(config.attr) == 'html')
						&& el.nodeType == 8)
					{
//						console.error('html is not supported in virtual elements: ', el);
						return 'text';
					}

					if (config.hasOwnProperty('attr'))
					{
						attr = ko.utils.unwrapObservable(config.attr);
					}
					else if (config.hasOwnProperty('html'))
					{
						attr = ko.utils.unwrapObservable(config.html);
					}

					if (typeof attr == 'boolean')
					{
						attr = attr ? 'html' : 'text';
					}

					return attr;
				};

				// constructs formatters based on config
				this.getFormatters = function (config):Array<ITextFormatter>
				{
					if (typeof config.formatters !== 'undefined')
					{
						var formatters = [];

						for (var i = 0; i < config.formatters.length; i++)
						{
							var formatter = config.formatters[i];

							var options:any = ko.utils.unwrapObservable(formatter.options);

							if (typeof options == 'object')
							{
								options = ko.toJS(formatter.options);
							}

							switch (formatter.name)
							{
								case 'lowercase':
								{
									formatters.push(new LowerCaseFormatter());
									break;
								}
								case 'uppercase':
								{
									formatters.push(new UpperCaseFormatter());
									break;
								}
								case 'maxchars':
								{
									formatters.push(new MaxCharsFormatter(options.maxChars, options.readMoreChars, options.splitOnWord));
									break;
								}
								case 'replace':
								{
									formatters.push(new ReplaceFormatter(options.replacements));
									break;
								}
								case 'plural':
								{
									formatters.push(new PluralFormatter(options.replacements));
									break;
								}
								case 'custom':
								{
									formatters.push(new CustomFormatter(options.func));
									break;
								}
							}
						}

						return formatters;
					}
					else
					{
						return [];
					}
				};

				var configs = this.getConfig(valueAccessor);

				for (var i = 0; i < configs.length; i++)
				{
					var config = configs[i];
					var attr = this.getAttr(element, config);

					KOElementManager.getInstance().add(element, <string> ko.utils.unwrapObservable(config.id), attr, []);
				}


				return { controlsDescendantBindings: false };
			},

			update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				var configs = this.getConfig(valueAccessor);

				for (var i = 0; i < configs.length; i++)
				{
					var config = configs[i];
					var attr = this.getAttr(element, config);

					var data = KOElementManager.getInstance().getDataForElement(element, attr);

					if (data)
					{
						data.id = <string> ko.utils.unwrapObservable(config.id);
						data.attr = attr;
						data.formatters = this.getFormatters(config);

						KOElementManager.getInstance().updateElement(data);
					}
				}
			}
		};

		ko.virtualElements.allowedBindings['localizedText'] = true;

		ko.bindingHandlers.localizedImage = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				var value = ko.utils.unwrapObservable(valueAccessor());
				if (typeof value === 'string')
				{
					ImageElementManager.getInstance().add(element, <string> value);
				}
				else
				{
					ImageElementManager.getInstance().add(element);
				}

				return { controlsDescendantBindings: false };
			},

			update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				var data = <ImageElementData>ImageElementManager.getInstance().getDataForElement(element);

				ImageElementManager.getInstance().updateElement(data);
			}
		};

		ko.bindingHandlers.localizedBgImage = {
			init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				var value = ko.utils.unwrapObservable(valueAccessor());
				if (typeof value === 'string')
				{
					BackgroundImageElementManager.getInstance().add(element, <string> value);
				}
				else
				{
					BackgroundImageElementManager.getInstance().add(element);
				}

				return { controlsDescendantBindings: false };
			},

			update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext)
			{
				var data = <ImageElementData>BackgroundImageElementManager.getInstance().getDataForElement(element);

				BackgroundImageElementManager.getInstance().updateElement(data);
			}
		};
	}
}

export default LocaleKnockoutBinding;