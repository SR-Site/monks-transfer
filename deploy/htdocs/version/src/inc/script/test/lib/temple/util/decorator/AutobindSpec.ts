import autobind from "lib/temple/util/decorator/autobind";

describe('lib', () =>
	describe('temple', () =>
		describe('util', () =>
			describe('decorator', () =>
				describe('autobind', () =>
				{
					class Foo
					{
						@autobind()
						public getScope():Foo
						{
							return this;
						}
					}

					it('should bind the method to the scope of the class instance when called async', () =>
					{
						let instance = new Foo();
						// create scope-less reference to method, essentially binding it to Window
						let getScope = instance.getScope;

						expect(getScope()).toEqual(jasmine.any(Foo));
					});
				})))));