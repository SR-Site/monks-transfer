import Log from "./Log";
import CoreObject from "../core/CoreObject";

/**
 * @author Arthur Dam <arthur@mediamonks.com>
 * @version 0.1
 * @module Temple
 * @namespace temple.utils
 * @class Color
 * @copyright MediaMonks B.V. 2014
 */

export interface RGB
{
	r:number;
	g:number;
	b:number;
	a?:number;
}

export interface HSL
{
	h:number;
	s:number;
	l:number;
}

export interface HSV
{
	h:number;
	s:number;
	v:number;
}

let _log:Log = new Log('lib.temple.util.Color');

class Color extends CoreObject implements RGB
{
	public static HEX_COLOR_REG_EXP:RegExp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})|([a-f\d])([a-f\d])([a-f\d])$/i;

	private static _CLAMP:number = 0xFF;

	/**
	 * Converts any kind of color object to RBG object
	 *
	 * @static
	 * @param color
	 */
	public static toRgb(color:string):RGB;
	public static toRgb(color:RGB):RGB;
	public static toRgb(color:HSL):RGB;
	public static toRgb(color:HSV):RGB;
	public static toRgb(color:number):RGB;
	public static toRgb(color:number, g?:number, b?:number, a?:number):RGB;
	public static toRgb(color:any, g?:number, b?:number, a:number = 1):RGB
	{
		var r:number;

		switch (typeof color)
		{
			case "string":
			{
				if (Color.HEX_COLOR_REG_EXP.test(color))
				{
					var result:RegExpExecArray = Color.HEX_COLOR_REG_EXP.exec(color);
					r = parseInt((result[1] || (result[4] + result[4])), 16),
					g = parseInt((result[2] || (result[5] + result[5])), 16),
					b = parseInt((result[3] || (result[6] + result[6])), 16);
				}
				break;
			}
			case "number":
			{
				if (g === void 0)
				{
					a = color >> 24 & Color._CLAMP;
					r = color >> 16 & Color._CLAMP;
					g = color >> 8 & Color._CLAMP;
					b = color & Color._CLAMP;
				}
				break;
			}
			case "object":
			{
				if ("r" in color)
				{
					return color;
				}
				else if ("l" in color)
				{
					return Color.hslToRgb(color);
				}
				else if ("v" in color)
				{
					return Color.hsvToRgb(color);
				}
				break;
			}
			default:
			{
				// ignore
				break;
			}
		}

		if (g === void 0)
		{
			throw new Error("Don't know how to handle '" + color + "'");
		}

		return {r: r, g: g, b: b, a: a};
	}

	/**
	 * Converts a color as hex value.
	 *
	 * @static
	 * @method getHex
	 * @return {string}
	 */
	public static toHex(color:string):string;
	public static toHex(color:RGB):string;
	public static toHex(color:HSL):string;
	public static toHex(color:HSV):string;
	public static toHex(color:number):string;
	public static toHex(color:number, g?:number, b?:number, a?:number):string;
	public static toHex(color:any, g?:number, b?:number, a:number = 1):string
	{
		var rgb:RGB = Color.toRgb(color, g, b, a);
		return "#" + ((1 << 24) + (Math.round(rgb.r) << 16) + (Math.round(rgb.g) << 8) + Math.round(rgb.b)).toString(16).slice(1);
	}

	/**
	 * converts object's rgb to hsl
	 *
	 * @public
	 * @static
	 */
	public static rgbToHsl(rgb:RGB):HSL
	{
		let r:number = rgb.r / Color._CLAMP;
		let g:number = rgb.g / Color._CLAMP;
		let b:number = rgb.b / Color._CLAMP;

		let max:number = Math.max(r, g, b);
		let min:number = Math.min(r, g, b);
		let l:number = (max + min) / 2;

		if(max == min)
		{
			return {h: 0, s: 0, l: Color.absround(l * 100)};
		}

		let _d:number = max - min;
		let _s:number = _d / ( ( l <= 0.5) ? (max + min) : (2 - max - min) );
		let _h:number = ((max == r)
			? (g - b) / _d + (g < b ? 6 : 0)
			: (max == g)
			? ((b - r) / _d + 2)
			: ((r - g) / _d + 4)) / 6;

		return {
			h: Color.absround(_h * 360),
			s: Color.absround(_s * 100),
			l: Color.absround(l * 100)
		};
	}

	/**
	 * converts object's hsl to rgb
	 *
	 * @static
	 * @method hslToRgb
	 */
	public static hslToRgb(hsl:HSL):RGB
	{
		let h:number = hsl.h / 360;
		let s:number = hsl.s / 100;
		let l:number = hsl.l / 100;
		let q:number = l < 0.5 ? l * (1 + s) : (l + s - l * s);
		let p:number = 2 * l - q;

		return {
			r: Color.absround(Color.hue2rgb(p, q, h + 1/3) * 255),
			g: Color.absround(Color.hue2rgb(p, q, h) * 255),
			b: Color.absround(Color.hue2rgb(p, q, h - 1/3) * 255),
			a: 1
		};
	}

	/**
	 * converts object's rgb to hsv
	 *
	 * @public
	 * @static
	 * @method rgbToHsv
	 */
	public static rgbToHsv(rgb:RGB):HSV
	{
		let r:number = rgb.r / Color._CLAMP;
		let g:number = rgb.g / Color._CLAMP;
		let b:number = rgb.b / Color._CLAMP;

		let max:number = Math.max(r, g, b);
		let min:number = Math.min(r, g, b);
		let l:number = (max + min) / 2;
		let v:number = max;

		if(max == min)
		{
			return {h: 0, s: 0, v: Color.absround(v * 100)};
		}

		let _d:number = max - min;
		let _s:number = _d / ( ( l <= 0.5) ? (max + min) : (2 - max - min) );
		let _h:number = ((max == r)
			? (g - b) / _d + (g < b ? 6 : 0)
			: (max == g)
			? ((b - r) / _d + 2)
			: ((r - g) / _d + 4)) / 6;

		return {
			h: Color.absround(_h * 360),
			s: Color.absround(_s * 100),
			v: Color.absround(v * 100)
		};
	}

	/**
	 * converts object's hsv to rgb
	 *
	 * @static
	 * @method hsvToRgb
	 */
	public static hsvToRgb(hsv:HSV):RGB
	{
		let h:number = hsv.h / 360;
		let s:number = hsv.s / 100;
		let v:number = hsv.v / 100;
		let r:number = 0;
		let g:number = 0;
		let b:number = 0;
		let i:number = Math.floor(h * 6);
		let f:number = h * 6 - i;
		let p:number = v * (1 - s);
		let q:number = v * (1 - f * s);
		let t:number = v * (1 - (1 - f) * s);

		switch(i % 6)
		{
			case 0 :
			{
				r = v, g = t, b = p;
				break;
			}
			case 1 :
			{
				r = q, g = v, b = p;
				break;
			}
			case 2 :
			{
				r = p, g = v, b = t;
				break;
			}
			case 3 :
			{
				r = p, g = q, b = v;
				break;
			}
			case 4 :
			{
				r = t, g = p, b = v
				break;
			}
			case 5 :
			{
				r = v, g = p, b = q;
				break;
			}

			default:
			{
				throw new Error('Invalid value');
			}
		}

		return {
			r: Color.absround(r * 255),
			g: Color.absround(g * 255),
			b: Color.absround(b * 255),
			a: 1
		}
	}

	/**
	 * Interpolates between two colors.
	 *
	 * @static
	 * @method interpolate
	 * @param {Color} destination Color to interpolate to.
	 * @param {number} factor Interpolation factor.
	 * @returns {Color}
	 */
	public static interpolate(c1:RGB, c2:RGB, factor:number):RGB
	{
		return {
			r: Color.absround(+(c1.r) + (c2.r - c1.r) * factor),
			g: Color.absround(+(c1.g) + (c2.g - c1.g) * factor),
			b: Color.absround(+(c1.b) + (c2.b - c1.b) * factor),
			a: Color.absround(+(c1.a) + (c2.a - c1.a) * factor)
		}
	}

	/**
	 * @private
	 * makes a number absolute/rounded
	 */
	private static absround(c:number):number
	{
		return (0.5 + c) << 0;
	}

	/**
	 * @private
	 * converts hue to rgb
	 */
	private static hue2rgb(a:number, b:number, c:number):number
	{
		if(c < 0) c += 1;
		if(c > 1) c -= 1;
		if(c < 1/6) return a + (b - a) * 6 * c;
		if(c < 1/2) return b;
		if(c < 2/3) return a + (b - a) * (2/3 - c) * 6;
		return a;
	}

	/**
	 * The red value of the color.
	 *
	 * @property r
	 * @type number
	 */
	public r:number;

	/**
	 * The green value of the color.
	 *
	 * @property g
	 * @type number
	 */
	public g:number;

	/**
	 * The blue value of the color.
	 *
	 * @property b
	 * @type number
	 */
	public b:number;

	/**
	 * The alpha value of the color.
	 *
	 * @property a
	 * @type number
	 */
	public a:number = 1;

	/**
	 * Color utility class.
	 *
	 * @constructor
	 * @class Color
	 */
	constructor(color?:string);
	constructor(color?:RGB);
	constructor(color?:HSL);
	constructor(color?:HSV);
	constructor(color?:number);
	constructor(color?:number, g?:number, b?:number, a?:number);
	constructor(color?:any, g?:number, b?:number, a:number = 1)
	{
		super();

		if (color !== void 0)
		{
			switch (typeof color)
			{
				case "string":
				{
					this.setHex(color);
					break;
				}
				case "number":
				{
					if (g === void 0)
					{
						this.setInt(color);
					}
					else
					{
						this.r = color;
						this.g = g;
						this.b = b;
						this.a = a;
					}
					break;
				}
				case "object":
				{
					if ("r" in color)
					{
						this.setRgb(color);
						break;
					}
					else if ("l" in color)
					{
						this.setHsl(color);
						break;
					}
					else if ("v" in color)
					{
						this.setHsv(color);
						break;
					}
					// no break;
				}
					
				default:
				{
					throw new Error("Don't know how to handle '" + color + "'");
				}
			}
		}

		this.toStringProps = ['r', 'g', 'b', 'a'];
	}

	/**
	 * Returns the color value as a integer
	 * @returns {number}
	 */
	public getInt():number
	{
		return (Math.round(this.a) << 24) && (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
	}

	/**
	 * Set the color as an integer
	 * @param int
	 */
	public setInt(int:number):void
	{
		this.a = int >> 24 & Color._CLAMP;
		this.r = int >> 16 & Color._CLAMP;
		this.g = int >> 8 & Color._CLAMP;
		this.b = int & Color._CLAMP;
	}

	/**
	 * Returns the color value as a number
	 * @returns {number}
	 */
	public valueOf():number
	{
		return this.getInt();
	}

	/**
	 * Set value based on hex string.
	 *
	 * @method setHex
	 * @param {string} hex Hexadecimal input string.
	 * @return {void}
	 */
	public setHex(hex:string):Color
	{
		var result:RegExpExecArray = Color.HEX_COLOR_REG_EXP.exec(hex);

		this.r = parseInt((result[1] || (result[4] + result[4])), 16);
		this.g = parseInt((result[2] || (result[5] + result[5])), 16);
		this.b = parseInt((result[3] || (result[6] + result[6])), 16);

		return this;
	}

	/**
	 * Get color as hex value.
	 *
	 * @method getHex
	 * @return {string}
	 */
	public getHex():string
	{
		return "#" + ((1 << 24) + (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b)).toString(16).slice(1);
	}

	/**
	 * Set value based on "rgb()" string.
	 *
	 * @method setRgbString
	 * @param {string} hex RGB input string.
	 * @return {void}
	 */
	public setRgbString(rgb:string):Color
	{
		var result:Array<string> = rgb.replace(/[^\d,]/g, '').split(',');
		var r:number = parseInt(result[0], 10);
		var g:number = parseInt(result[1], 10);
		var b:number = parseInt(result[2], 10);

		if(result.length !== 3 || r > Color._CLAMP || r < 0 || g > Color._CLAMP || g < 0 || b > Color._CLAMP || b < 0)
		{
			_log.warn('setRgbString: ' + rgb + 'is not a valid input!')
			return;
		}

		this.r = r;
		this.g = g;
		this.b = b;

		return this;
	}

	/**
	 * Get color as rgb() string.
	 *
	 * @method getRgbString
	 * @return {string}
	 */
	public getRgbString():string
	{
		return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
	}

	/**
	 * Set value based on "rgba()" string.
	 *
	 * @method setRgbaString
	 * @param {string} rgba Rgba input string.
	 * @return {void}
	 */
	public setRgbaString(rgba:string):void
	{
		var result:Array<string> = rgba.replace(/[^\d,]/g, '').split(',');

		var r:number = parseInt(result[0], 10);
		var g:number = parseInt(result[1], 10);
		var b:number = parseInt(result[2], 10);
		var a:number = parseInt(result[3], 10);

		if(result.length !== 4 || r > Color._CLAMP || r < 0 || g > Color._CLAMP || g < 0 || b > Color._CLAMP || b < 0 || a > 1 || a < 0)
		{
			_log.warn('setRgbaString: ' + rgba + 'is not a valid input!')
			return;
		}

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	/**
	 * Get color as rgba() string.
	 *
	 * @method getRgbaString
	 * @return {string}
	 */
	public getRgbaString():string
	{
		return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
	}

	/**
	 * Set value based on direct input.
	 *
	 * @method setRgb
	 * @param {any} color Input object (r:number; g:number; b:number; a?:number (optional)).
	 * @return {void}
	 */
	public setRgb(color:RGB):Color
	{
		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		if(color.a) this.a = color.a;

		return this;
	}

	/**
	 * Get color as rgb.
	 *
	 * @method getRgb
	 * @returns {any} {r:number; g:number; b:number;}
	 */
	public getRgb():RGB
	{
		return {
			r: this.r,
			g: this.g,
			b: this.b,
			a: this.a
		};
	}


	/**
	 * Get color as hsl.
	 *
	 * @method getHsl
	 * @return {any} {h:number; s:number; l:number;}
	 */
	public getHsl():HSL
	{
		return Color.rgbToHsl(this);
	}

	/**
	 * Set value of the color based on hsl input.
	 *
	 * @method setHsl
	 * @param {any} color Input object {h:number; s:number; l:number;}.
 	 * @return {void}
	 */
	public setHsl(color:HSL):Color
	{
		return this.setRgb(Color.hslToRgb(color));
	}

	/**
	 * Get color as hsv.
	 *
	 * @method getHsv
	 * @returns {object}
	 * @return {any} {h:number; s:number; v:number}
	 */
	public getHsv():HSV
	{
		return Color.rgbToHsv(this);
	}

	/**
	 * Set value of the color based on hsv input.
	 *
	 * @method setHsv
	 * @param {object} hsv Input object (h:number; s:number; v:number;)
	 * @return {void}
	 */
	public setHsv(color:HSV):Color
	{
		return this.setRgb(Color.hsvToRgb(color));
	}


	/**
	 * Get the hue of the color.
	 *
	 * @method getHue
	 * @return {number}
	 */
	public getHue():number
	{
		return this.getHsl().h;
	}

	/**
	 * Set hue of the color.
	 *
	 * @method setHue
	 * @param {number} hue Input hue.
	 * @return void
	 */
	public setHue(hue:number):Color
	{
		let hsl:HSL = this.getHsl();
		hsl.h = hue;
		return this.setHsl(hsl);
	}

	/**
	 * Get the saturation of the color.
	 *
	 * @method getSaturation
	 * @return {number}
	 */
	public getSaturation():number
	{
		return this.getHsl().s;
	}

	/**
	 * Set saturation of the color.
	 *
	 * @method setSaturation
	 * @param {number} saturation Input saturation.
	 * @return {void}
	 */
	public setSaturation(saturation:number):Color
	{
		let hsv:HSV = this.getHsv();
		hsv.s = saturation;
		return this.setHsv(hsv)
	}

	/**
	 * Get the brightness of the color.
	 *
	 * @method getBrightness
	 * @return {number}
	 */
	public getBrightness():number
	{
		return this.getHsv().v;
	}

	/**
	 * Set the brightness of the color.
	 *
	 * @method setBrightness
	 * @param {number} brightness Input brightness.
	 * @return {void}
	 */
	public setBrightness(brightness:number):Color
	{
		let hsv:HSV = this.getHsv();
		hsv.v = brightness;
		return this.setHsv(hsv);
	}

	/**
	 * Get lightness of the color.
	 *
	 * @method getLightness
	 * @return {number}
	 */
	public getLightness():number
	{
		return this.getHsl().l;
	}

	/**
	 * Set the lightness of the color.
	 *
	 * @method setLightness
	 * @param {number} lightness Input lightness
	 * @return {void}
	 */
	public setLightness(lightness:number):Color
	{
		let hsl:HSL = this.getHsl();
		hsl.l = lightness;
		return this.setHsl(hsl);
	}

	/**
	 * Applies matrix color operation to the color.
	 *
	 * @method applyMatrixFilter
	 * @param {number[]} m Color transformation matrix
	 * @return {void}
	 */
	public applyMatrixFilter(m:Array<number>):Color
	{
		if(m.length < 20) return;
		this.r = this.r * m[0] + this.g * m[1] + this.b * m[2] + this.a * m[3] + m[4];
		this.g = this.r * m[5] + this.g * m[6] + this.b * m[7] + this.a * m[8] + m[9];
		this.b = this.r * m[10]+ this.g * m[11]+ this.b * m[12]+ this.a * m[13]+ m[14];
		this.a = this.r * m[15]+ this.g * m[16]+ this.b * m[17]+ this.a * m[18]+ m[19];

		return this;
	}
}

export default Color;