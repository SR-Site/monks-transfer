import logOnCall from "lib/temple/util/decorator/logOnCall";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('logOnCall', () =>
				{
					beforeEach(function()
					{
						this.spy = spyOn(console, 'info');

						class Foo
						{
							@logOnCall()
							foo(...args:Array<any>):any
							{
								return args;
							}
						}

						this.instance = new Foo();
					});

					it('should call console.info twice when calling the method', function()
					{
						this.instance.foo(1, 2);
						expect(this.spy.calls.count()).toBe(2);
					});

					it('should run the original function and return what the original function returns', function () {
						this.instance.foo(1, 2);

						expect(this.instance.foo(1, 2)[0]).toBe(1);
						expect(this.instance.foo(1, 2)[1]).toBe(2);
					});

					it('should log the input values of the method', function () {
						this.instance.foo(1, 2);

						expect(this.spy.calls.argsFor(0)[1]).toBe(1);
						expect(this.spy.calls.argsFor(0)[2]).toBe(2);
					});

					it('should log the output values of the method', function () {
						this.instance.foo(1, 2);

						expect(this.spy.calls.argsFor(1)[1][0]).toBe(1);
						expect(this.spy.calls.argsFor(1)[1][1]).toBe(2);
					});
				})))));