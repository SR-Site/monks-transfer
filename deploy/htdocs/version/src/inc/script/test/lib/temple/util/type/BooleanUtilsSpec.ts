import BooleanUtils from 'lib/temple/util/type/BooleanUtils';

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('type', () =>
				describe('BooleanUtils', () =>
				{
					describe('getBoolean', () => it(`should resolve 'yes' to true`, () => expect(BooleanUtils.getBoolean('yes')).toBe(true)));
					describe('getBoolean', () => it(`should resolve true to true`, () => expect(BooleanUtils.getBoolean(true)).toBe(true)));
					describe('getBoolean', () => it(`should resolve 1 to true`, () => expect(BooleanUtils.getBoolean(1)).toBe(true)));
					describe('getBoolean', () => it(`should resolve 'on' to true`, () => expect(BooleanUtils.getBoolean('on')).toBe(true)));

					describe('getBoolean', () => it(`should resolve 'no' to false`, () => expect(BooleanUtils.getBoolean('no')).toBe(false)));
					describe('getBoolean', () => it(`should resolve 'off' to false`, () => expect(BooleanUtils.getBoolean('false')).toBe(false)));
					describe('getBoolean', () => it(`should resolve '0' to false`, () => expect(BooleanUtils.getBoolean('0')).toBe(false)));
				})))));