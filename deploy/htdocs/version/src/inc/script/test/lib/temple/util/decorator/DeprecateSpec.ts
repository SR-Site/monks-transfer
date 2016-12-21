import deprecate from "lib/temple/util/decorator/deprecate";
import {deprecateMethodSignatureTemplate, defaultDeprecationMessage, defaultDeprecationWithVersionMessage} from "lib/temple/util/decorator/deprecate";
import StringUtils from "lib/temple/util/type/StringUtils";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('deprecate', () =>
				{
					beforeEach(function()
					{
						spyOn(console, 'warn');
						spyOn(console, 'info');

						class Foo
						{
							// default all arguments
							@deprecate()
							public add(n1:number, n2:number):number
							{
								return n1 + n2;
							}

							// custom message
							@deprecate('test')
							public div(n1:number, n2:number):number
							{
								return n1 / n2;
							}

							// default message + console.info call
							@deprecate(void 0, console.info)
							public sub(n1:number, n2:number):number
							{
								return n1 - n2;
							}

							// warn version number in default message string
							@deprecate('1.2.3.4.5.6', void 0, true)
							public mul(n1:number, n2:number):number
							{
								return n1 * n2;
							}
						}

						this.instance = new Foo();
					});

					it('should return the correct value with @deprecate on the method', function()
					{
						expect(this.instance.add(1, 1)).toBe(2);
						expect(this.instance.sub(2, 1)).toBe(1);
					});

					it('should call console.warn by default', function()
					{
						this.instance.add(1, 1);

						expect(console.warn)
							.toHaveBeenCalledWith(
								StringUtils.replaceVars(deprecateMethodSignatureTemplate, {
									className: 'Foo',
									method: 'add',
									message: defaultDeprecationMessage
								}));
					});

					it('should call warn with the given string', function()
					{
						this.instance.div(1, 1);

						expect(console.warn)
							.toHaveBeenCalledWith(
								StringUtils.replaceVars(deprecateMethodSignatureTemplate, {
									className: 'Foo',
									method: 'div',
									message: 'test'
								}));
					});

					it('should use a different console method', function()
					{
						this.instance.sub(1, 1);

						expect(console.info)
							.toHaveBeenCalledWith(
								StringUtils.replaceVars(deprecateMethodSignatureTemplate, {
									className: 'Foo',
									method: 'sub',
									message: defaultDeprecationMessage
								})
							);
					});

					it('should log the default message with the given version number', function()
					{
						this.instance.mul(10, 1);

						expect(console.warn)
							.toHaveBeenCalledWith(
								StringUtils.replaceVars(deprecateMethodSignatureTemplate, {
									message: StringUtils.replaceVars(defaultDeprecationWithVersionMessage, {
										version: '1.2.3.4.5.6'
									}),
									className: 'Foo',
									method: 'mul'
								})
							);
					});
				})))));