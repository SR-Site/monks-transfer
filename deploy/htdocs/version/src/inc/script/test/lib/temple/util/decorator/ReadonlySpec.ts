import readonly from "lib/temple/util/decorator/readonly";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('readonly', () =>
				{
					let initialValue = 1;

					class Foo
					{
						@readonly()
						public prop:number = initialValue;
					}

					let instance:Foo;

					beforeEach(() => instance = new Foo());

					it('should not update the value when the accessor tries to change it', () => {
						instance.prop = 2;

						expect(instance.prop).toBe(initialValue);
					})
				})))));