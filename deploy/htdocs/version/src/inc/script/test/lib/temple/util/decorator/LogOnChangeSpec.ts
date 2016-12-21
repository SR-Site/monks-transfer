import logOnChange from "lib/temple/util/decorator/logOnChange";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('logOnChange', () =>
				{
					beforeEach(function()
					{
						this.spies = {
							info: spyOn(console, 'info'),
							trace: spyOn(console, 'trace')
						};

						class Foo
						{
							@logOnChange(true, false, false)
							public logSet:number = 1;

							@logOnChange(false, true)
							public logGet:number = 1;

							@logOnChange(true, true, true)
							public all:number = 1;
						}

						this.instance = new Foo();
					});

					it('should call console.info when accessing the property', function()
					{
						this.instance.logGet;
						this.instance.logGet;

						expect(this.spies.info.calls.count()).toBe(2);
						expect(this.spies.trace.calls.count()).toBe(0);
					});

					it('should call console.info when changing the property', function() {
						this.instance.logSet = 2;
						this.instance.logSet = 3;

						expect(this.spies.info.calls.count()).toBe(2);
						expect(this.spies.trace.calls.count()).toBe(0);
					});

					it('should update the property to the new value', function() {
						this.instance.logSet = 2;
						this.instance.logSet = 3;

						expect(this.instance.logSet).toBe(3);
					});

					it('should call console.trace and console.info when changing the property', function()
					{
						this.instance.all = 2;
						this.instance.all = 3;

						expect(this.spies.info.calls.count()).toBe(2);
						expect(this.spies.trace.calls.count()).toBe(2);
					});

					it('should call console.trace and console.info when accessing the property', function()
					{
						this.instance.all;
						this.instance.all;

						expect(this.spies.info.calls.count()).toBe(2);
						expect(this.spies.trace.calls.count()).toBe(2);
					});
				})))));