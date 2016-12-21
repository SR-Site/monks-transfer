import Color from "lib/temple/util/Color";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('Color', () =>
			{
				it('Should convert the color correctly', () =>
				{
					expect(Color.toRgb('#FF0000')).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(Color.toRgb('#ff0000')).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(Color.toRgb('#F00')).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(Color.toRgb('F00')).toEqual({r: 255, g: 0, b: 0, a: 1});

					expect(Color.rgbToHsl({r: 255, g: 0, b: 0, a: 1})).toEqual({h: 0, s: 100, l: 50});
					expect(Color.rgbToHsl({r: 255, g: 255, b: 0, a: 1})).toEqual({h: 60, s: 100, l: 50});

					expect(Color.hslToRgb({h: 0, s: 100, l:50 })).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(Color.hslToRgb({h: 60, s: 100, l:50 })).toEqual({r: 255, g: 255, b: 0, a: 1});

					expect(Color.rgbToHsv({r: 255, g: 0, b: 0, a: 1})).toEqual({h: 0, s: 100, v: 100});
					expect(Color.rgbToHsv({r: 255, g: 255, b: 0, a: 1})).toEqual({h: 60, s: 100, v: 100});

					expect(Color.hsvToRgb({h: 0, s: 100, v:100 })).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(Color.hsvToRgb({h: 60, s: 100, v:100 })).toEqual({r: 255, g: 255, b: 0, a: 1});

					expect(Color.toRgb({h: 0, s: 100, l:50 })).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(new Color('F00').getRgb()).toEqual({r: 255, g: 0, b: 0, a: 1});
					expect(new Color({h: 0, s: 100, l:50 }).getRgb()).toEqual({r: 255, g: 0, b: 0, a: 1});
				});

				it('Should throw an Error', () =>
				{
					expect(() => Color.toRgb('wrong value')).toThrow();
					expect(() => new Color('wrong value')).toThrow();
				});

			}))));