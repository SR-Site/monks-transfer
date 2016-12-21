import memoize from "lib/temple/util/decorator/memoize";
import {hashingMethods} from "lib/temple/util/decorator/memoize";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('memoize', () =>
				{
					beforeEach(function()
					{
						let hashMethod = {
							hashMethod: (n) => n
						};

						this.hashMethodSpy = spyOn(hashMethod, 'hashMethod').and.callThrough();

						class Foo
						{
							@memoize()
							add1(n:number):number
							{
								return this._add1(n);
							}

							@memoize(hashMethod.hashMethod)
							mul2(n:number):number
							{
								return this._mul2(n);
							}

							@memoize(hashingMethods.mixedArgumentTypes)
							mixed(n:number, arr:Array<string>, obj:{foo:string;bar:RegExp}):{qux:string;baz:boolean;thing:Array<string>}
							{
								return this._mixed(n, arr, obj);
							}

							// these proxy methods are required for spying call count
							private _add1(n:number):number
							{
								return n + 1;
							}

							private _mul2(n:number):number
							{
								return n * 2;
							}

							private _mixed(n:number, arr:Array<string>, obj:{foo:string;bar:RegExp}):{qux:string;baz:boolean;thing:Array<string>}
							{
								// return a mixed object with deterministic values
								return {
									qux: obj.foo,
									baz: obj.bar.test(obj.foo),
									thing: arr.slice(0, 1)
								}
							}
						}

						this.instance = new Foo();

						this.add1Spy = spyOn(this.instance, '_add1').and.callThrough();
						this.mixedSpy = spyOn(this.instance, '_mixed').and.callThrough();

					});

					it('should run the hash method when calling a memoized function with a custom hash method', function()
					{
						this.instance.mul2(1);
						this.instance.mul2(2);

						expect(this.hashMethodSpy.calls.count()).toBe(2);
					});

					it('should run the memoized method once when run twice with the same argument', function()
					{
						this.instance.add1(3);
						this.instance.add1(3);

						expect(this.add1Spy.calls.count()).toBe(1);
					});

					it('should return the correct value before memoizing', function()
					{
						expect(this.instance.add1(1)).toBe(2);
					});

					it('should return the correct value after memoizing', function()
					{
						expect(this.instance.add1(2)).toBe(3);
						expect(this.instance.add1(2)).toBe(3);
					});

					it('should return the correct value before memoizing', function()
					{
						expect(this.instance.mul2(2)).toBe(4);
					});

					it('should return the correct value after memoizing', function()
					{
						expect(this.instance.mul2(1)).toBe(2);
						expect(this.instance.mul2(1)).toBe(2);
					});

					it('should memoize the method with mixed arguments and run the method only once', function()
					{
						this.instance.mixed(1, ['foo', 'baz', 'qux'], {
							foo: 'oh no!',
							bar: /qux/
						});

						this.instance.mixed(1, ['foo', 'baz', 'qux'], {
							foo: 'oh no!',
							bar: /qux/
						});

						expect(this.mixedSpy.calls.count()).toEqual(1);
					});
				})))));