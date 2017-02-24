import ko = require('knockout');
import Promise = require('bluebird');
import GaiaHistory from "../gaia/core/GaiaHistory";
import GaiaHistoryEvent from "../gaia/event/GaiaHistoryEvent";
import StringUtils from "../temple/util/type/StringUtils";

/**
 *
 * A class for including SVG icons in a page with the help of a Knockout binding
 *
 * The class will include a CSS file that is being specified in the static _STYLESHEET_SVG.
 * This will be created when running "grunt svg" and contains a CSS selector for each icon with a Base54 encoded
 * background image. We use a loadCSS task to get all the icons. From the HTML we can then use the icons as a background
 * or include them as an SVG in the element itself.
 *
 * Getting started
 * The binding is automatically included and will be loading the CSS. You can just add a classname prefixed with 'icon-'
 * in the HTML to have the icon as a background image.
 * If you need the do styling on the SVG, you have to embed the SVG in the page itself.
 * This can be done with using 'data-bind="icon: name"' on an element. This class will empty the element and insert the
 * SVG rendered from the Base64 encoded CSS class.
 *
 * There is a special rule for definitions within the SVG's. Due to a bug the id's don't work with our set Base href.
 * So we fix this by adding the complete href before this.
 *
 * To make the SVG a bit more dynamic (especially with copy) there is an option to add replacement Copy.
 * This can be used in the following way:
 * icon: {
 *      id: 'text-path',
 *      replaceText: {
 *          copy: 'Replace Copy'
 *      }
 * }
 * The code will look for "{{copy}}" within the SVG and replace it with "Replace Copy"
 *
 * An event is being fired when the icon is included in the page. on the element with the data-bind it's possible to
 * listen to the static 'EVENT_ICON_RENDER' event from the KnockoutIcon class.
 * Use this when you directly want to animate SVG's in JS and you're not sure the SVG is loaded.
 *
 * The class will also set a data event to true with knockout domData so you can check yourself if the SVG is loaded
 * already. Use "ko.utils.domData.get(wrapper, 'svg-injected')" for this.
 *
 */
class KnockoutIcon
{
	public static getLocation():string
	{
		return document.location.protocol + '//' + document.location.host + document.location.pathname + document.location.search;
	}

	public static EVENT_ICON_RENDER:string = 'KnockoutIcon.ICON_RENDERED';

	private static _ICON_PREFIX:string = '.icon-';
	private static _STYLESHEET_SVG:string = 'inc/svg/icons.svg.css';
	private static _PIXEL_IMG:string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

	private static _cssLoaded:boolean = false;
	private static _icons:{ [key:string] : string };

	private static _injectCount:number = 0;
	private static _hrefObservable:KnockoutObservable<string> = ko.observable(KnockoutIcon.getLocation());

	private static _isHistoryInited:boolean = false;

	static init():any
	{
		/**
		 * Added a History EventListener for updating the hrefObservable with the window location
		 * This triggers the Update functions where icons with special defs will be updated
		 */
		if (!KnockoutIcon._isHistoryInited)
		{
			GaiaHistory.getInstance().addEventListener(GaiaHistoryEvent.DEEPLINK, () =>
			{
				KnockoutIcon._hrefObservable(KnockoutIcon.getLocation());
			});
			KnockoutIcon._isHistoryInited = true;
		}
	}

	static update(element, valueAccessor:() => any):any
	{
		const value = ko.unwrap(valueAccessor());
		var id:string;
		var options = <IKnockoutIconEmbedOptions>{};

		if (typeof value == 'string')
		{
			id = value;
		}
		else
		{
			id = value.id;
			options = <IKnockoutIconEmbedOptions>value;
		}

		KnockoutIcon.embedIcon(element, id, KnockoutIcon.getLocation(), options);

		return {};
	}

	/**
	 * Embed a single icon.
	 * Retrieve all icons first, when completed, inject icon in HTML
	 *
	 * @method embedIcon
	 * @param {HTMLElement} element
	 * @param {string} iconName
	 */
	private static embedIcon(element:HTMLElement, iconName:string, baseHref:string, options:IKnockoutIconEmbedOptions):void
	{
		KnockoutIcon.getIcons().then(() =>
		{
			if (KnockoutIcon._icons && KnockoutIcon._icons[iconName])
			{
				element.classList.add(KnockoutIcon._ICON_PREFIX.replace('.', '') + iconName);

				KnockoutIcon.safeInjectSVG(element, KnockoutIcon._icons[iconName], baseHref, options);
			}
		});
	}

	/**
	 * @private
	 * @method safeInjectSVG
	 */
	private static safeInjectSVG(wrapper:HTMLElement, svgPath:string, baseHref:string, options:IKnockoutIconEmbedOptions):void
	{
		const svgInjected = ko.utils.domData.get(wrapper, 'svg-injected');

		// No need for re-rendering if there are nu URL's to replace and the SVG is already rendered
		if (svgInjected && !ko.utils.domData.get(wrapper, 'injected-svg-urls')) return;

		if (options.replaceText)
		{
			Object.keys(options.replaceText).forEach((key:string) =>
			{
				svgPath = StringUtils.replace(svgPath, '{{' + key + '}}', options.replaceText[key]);
			});
		}

		let svg:SVGElement;
		if (svgInjected)
		{
			svg = <SVGElement>wrapper.querySelector('svg');
		}
		else
		{
			wrapper.innerHTML = '';

			// Add temp image with a transparent pixel. This will be replaced later
			var tmpImage = new Image;
			tmpImage.src = KnockoutIcon._PIXEL_IMG;
			wrapper.appendChild(tmpImage);

			if (DOMParser) //&& (DOMParser instanceof Function) // Doesn't work in Safari
			{
				var xmlDoc;
				try {
					var parser = new DOMParser();
					xmlDoc = parser.parseFromString(svgPath, 'text/xml');
				}
				catch (e) {
					xmlDoc = undefined;
				}

				if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
					// No SVG
					return;
				}
				else {
					svg = xmlDoc.documentElement;
				}
			}
		}

		if (svg)
		{
			// Make sure any internally referenced clipPath ids and their
			// clip-path references are unique.
			//
			// This addresses the issue of having multiple instances of the
			// same SVG on a page and only the first clipPath id is referenced.
			//
			// Browsers often shortcut the SVG Spec and don't use clipPaths
			// contained in parent elements that are hidden, so if you hide the first
			// SVG instance on the page, then all other instances lose their clipping.
			// Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027

			// Handle all defs elements that have iri capable attributes as defined by w3c: http://www.w3.org/TR/SVG/linking.html#processingIRI
			// Mapping IRI addressable elements to the properties that can reference them:
			var iriElementsAndProperties = {
				'clipPath': ['clip-path'],
				'color-profile': ['color-profile'],
				'cursor': ['cursor'],
				'filter': ['filter'],
				'linearGradient': ['fill', 'stroke'],
				'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
				'mask': ['mask'],
				'pattern': ['fill', 'stroke'],
				'radialGradient': ['fill', 'stroke']
			};

			var element,
				elementDefs,
				properties,
				currentId,
				newId;

			var replacedUrls:boolean = false;
			Object.keys(iriElementsAndProperties).forEach(function (key)
			{
				element = key;
				properties = iriElementsAndProperties[key];

				elementDefs = svg.querySelectorAll('defs ' + element + '[id]');
				for (var i = 0, elementsLen = elementDefs.length; i < elementsLen; i++) {
					currentId = elementDefs[i].id;
					newId = currentId + '-' + KnockoutIcon._injectCount;

					// All of the properties that can reference this element type
					var referencingElements;
					properties.forEach((property) =>
					{
						// :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
						referencingElements = svg.querySelectorAll('[' + property + '*="#' + currentId + '"]');
						for (var j = 0, referencingElementLen = referencingElements.length; j < referencingElementLen; j++) {
							referencingElements[j].setAttribute(property, 'url(' + baseHref + '#' + newId + ')');
							replacedUrls = true;
						}
					});

					elementDefs[i].id = newId;
				}
			});

			Array.from(svg.querySelectorAll('textPath')).forEach((element:SVGTextPathElement) =>
			{
				currentId = element.getAttribute('xlink:href');
				newId = currentId + '-' + KnockoutIcon._injectCount;

				svg.querySelector(currentId).setAttribute('id', newId.substr(1, newId.length - 1));
				element.setAttribute('xlink:href', baseHref + newId);
			});

			if (replacedUrls) ko.utils.domData.set(wrapper, 'injected-svg-urls', true);
			ko.utils.domData.set(wrapper, 'svg-injected', true);

			if (!svgInjected)
			{
				// Replace the image with the svg
				wrapper.replaceChild(svg, tmpImage);

				// Dispatch icon rendered event for listening to in the HTML when icon in inserted
				var event = document.createEvent('Event');
				event.initEvent(KnockoutIcon.EVENT_ICON_RENDER, true, true);
				wrapper.dispatchEvent(event);

				++KnockoutIcon._injectCount;
			}

			wrapper.style.backgroundImage = 'none';
			tmpImage = null;
			wrapper = null;
		}
	}

	/**
	 * If not loaded already, load the CSS and resolve the promise
	 *
	 * @method getIcons
	 * @returns {Promise<void>}
	 */
	private static getIcons():Promise<void>
	{
		return new Promise<void>((resolve:() => void, reject:() => void) =>
		{
			if (KnockoutIcon._cssLoaded)
			{
				resolve();
			}
			else
			{
				var navigator = window.navigator;
				var document = window.document;
				var Image = window['Image'];

				// Thanks Modernizr & Erik Dahlstrom
				var svg = !!document.createElementNS &&
					!!document.createElementNS('http://www.w3.org/2000/svg', 'svg')['createSVGRect'] &&
					// document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1') && TODO: Does not compile
					!(window['opera'] && navigator.userAgent.indexOf('Chrome') === -1) &&
					navigator.userAgent.indexOf('Series40') === -1;

				var img = new Image();
				img.onerror = () => reject();
				img.onload = () =>
				{
					loadCSS(KnockoutIcon._STYLESHEET_SVG).then((stylesheet) =>
					{
						KnockoutIcon._cssLoaded = true;
						KnockoutIcon._icons = KnockoutIcon.getIconsFromStylesheet(stylesheet);

						resolve();
					});
				};
				img.src = KnockoutIcon._PIXEL_IMG;
			}

		});
	}

	/**
	 * Parses the givin stylesheet and returns a list with the CSS selector and the matching SVG icon
	 *
	 * @method getIconsFromStylesheet
	 * @param {HTMLLinkElement} stylesheet
	 * @returns { [key:string] : string }
	 */
	private static getIconsFromStylesheet(stylesheet:HTMLLinkElement):{ [key:string] : string }
	{
		// get grunticon stylesheet by its href
		var icons:{ [key:string]:string } = {},
			svgss,
			rules, cssText,
			iconClass, iconSVGEncoded, iconSVGRaw;

		svgss = stylesheet.sheet;

		if(!svgss){ return icons; }

		rules = svgss.cssRules ? svgss.cssRules : svgss.rules;
		for(var i = 0; i < rules.length; i++)
		{
			cssText = rules[i].cssText;
			iconClass = rules[i].selectorText.replace(KnockoutIcon._ICON_PREFIX, '');
			iconSVGEncoded = cssText.split(');')[ 0 ].match(/US\-ASCII\,([^"']+)/);
			if(iconSVGEncoded && iconSVGEncoded[1])
			{
				iconSVGRaw = decodeURIComponent(iconSVGEncoded[1]);
				icons[iconClass] = iconSVGRaw;

			}
		}
		return icons;
	}
}

var loadCSS = (url:string):Promise<HTMLLinkElement> =>
{
	return new Promise<HTMLLinkElement>((resolve:(ss:HTMLLinkElement) => void, reject:() => void) =>
	{
		var stylesheet:HTMLLinkElement = <HTMLLinkElement>window.document.createElement('link'),
			newMedia = 'all',
			ref;
		var refs = (window.document.getElementsByTagName('head')[0] || window.document.body).childNodes;
		ref = refs[refs.length - 1];

		var sheets = window.document.styleSheets;
		stylesheet.rel = 'stylesheet';
		stylesheet.href = url;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		stylesheet.media = 'only x';

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		var ready = (cb:() => any) =>
		{
			if (window.document.body) return cb();
			setTimeout(() => ready(cb));
		};

		// Inject link
		// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
		// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready(() => ref.parentNode.insertBefore(stylesheet, ref.nextSibling));

		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = (cb) =>
		{
			var resolvedHref = stylesheet.href;
			var currentSheet = Array.from(sheets).find((sheet:StyleSheet) => sheet.href === resolvedHref);
			if (currentSheet)
			{
				return cb();
			}
			setTimeout(() => onloadcssdefined(cb));
		};

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if (stylesheet.addEventListener)
		{
			stylesheet.addEventListener('load', () =>
			{
				stylesheet.media = newMedia;
			});
		}
		stylesheet['onloadcssdefined'] = onloadcssdefined;
		onloadcssdefined(() =>
		{
			if (stylesheet.media !== newMedia)
			{
				stylesheet.media = newMedia;
			}
		});

		var called;
		var newcb = () =>
		{
			if (!called)
			{
				called = true;
				resolve(stylesheet);
			}
		};
		if (stylesheet.addEventListener)
		{
			stylesheet.addEventListener('load', newcb);
		}
		else if (stylesheet['attachEvent'])
		{
			stylesheet['attachEvent']('onload', newcb);
		}

		// This code is for browsers that don’t support onload
		// No support for onload (it'll bind but never fire):
		//    * Android 4.3 (Samsung Galaxy S4, Browserstack)
		//    * Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
		//    * Android 2.3 (Pantech Burst P9070)

		// Weak inference targets Android < 4.4
		if ('isApplicationInstalled' in navigator && 'onloadcssdefined' in stylesheet)
		{
			stylesheet['onloadcssdefined'](newcb);
		}
	});
};

interface IKnockoutIconEmbedOptions {
	id:string;
	replaceText:{ [name:string]:string }
}

ko.bindingHandlers['icon'] = KnockoutIcon;
ko.virtualElements.allowedBindings['icon'] = true;

export default KnockoutIcon;