import BasicEvent from "lib/temple/event/BasicEvent";
import EventDispatcher from "lib/temple/event/EventDispatcher";
import IDestructible from "lib/temple/core/IDestructible";
import polyfills from "lib/polyfill/polyfills";
import IEvent from "../../../../lib/temple/event/IEvent";
import EventPhase from "../../../../lib/temple/event/EventPhase";
import EventState from "../../../../lib/temple/event/EventState";
polyfills;

//import config from "app/config/config";
describe('lib', () =>
	describe('temple', () =>
		describe('event', () =>
			describe('EventDispatcher', () =>
			{
				var type1:string = "a";
				var type2:string = "b";

				var event1:BasicEvent;
				var event2:BasicEvent;

				var dispatcher:EventDispatcher;
				var output:string;

				var handler1 = (event:IEvent)=>
				{
					output += "1" + event.type;
				};

				var handler2 = (event:IEvent)=>
				{
					output += "2" + event.type;
				};

				var handler3 = (event:IEvent)=>
				{
					output += "3" + event.type;
				};

				var parent:EventDispatcher;
				var child:EventDispatcher;

				var getName = (object:EventDispatcher) =>
				{
					switch (object)
					{
						case dispatcher: return 'dispatcher';
						case parent: return 'parent';
						case child: return 'child';
						default: return 'unknown';
					}
				};

				var handler4 = (event:IEvent) =>
				{
					output += ' -handler4:';
					output += ' target=' + getName(event.target);
					output += ' currentTarget=' + getName(event.currentTarget);
					output += ' eventPhase=' + event.eventPhase;
				};

				beforeEach(function()
				{
					dispatcher = new EventDispatcher();
					output = "";

					parent = new EventDispatcher();
					child = new EventDispatcher(null, parent);

					event1 = new BasicEvent(type1);
					event2 = new BasicEvent(type2);
				});

				it('should have executed handler1', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a');
				});

				it('should have executed handler1, handler2 and handler3', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					dispatcher.addEventListener(type1, handler2);
					dispatcher.addEventListener(type1, handler3);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a2a3a');
				});

				it('should have executed handler1, handler2 and handler3 in the right priority', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					dispatcher.addEventListener(type1, handler2, false, 1);
					dispatcher.addEventListener(type1, handler3, false, -1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('2a1a3a');
				});

				it('should have executed handler1 only once', () =>
				{
					dispatcher.addEventListener(type1, handler1).once();
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a');
				});

				it('should have executed handler1 only once and handler2 twice', () =>
				{
					dispatcher.addEventListener(type1, handler1).once();
					dispatcher.addEventListener(type1, handler2);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a2a2a');
				});

				it('should have executed handler1 twice and handler2 once', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					var handler:IDestructible = dispatcher.addEventListener(type1, handler2);

					dispatcher.addEventListener(type1, (event:BasicEvent) =>
					{
						handler.destruct();
					}, false, 1);


					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a2a1a');
				});

				it('should have handled the second event within the first', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					dispatcher.addEventListener(type1, (event:BasicEvent) =>
					{
						dispatcher.dispatchEvent(event2);
					});
					dispatcher.addEventListener(type1, handler2);

					dispatcher.addEventListener(type2, handler1);
					dispatcher.addEventListener(type2, handler2);

					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a1b2b2a');
				});

				it('it should only add the listener once', () =>
				{
					dispatcher.addEventListener(type1, handler1);
					dispatcher.addEventListener(type1, handler1);
					dispatcher.addEventListener(type1, handler1);

					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a');
				});

				it('it should not execute the handler', () =>
				{
					dispatcher.addEventListener(type1, handler1, true);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('');
				});

				it('it should execute the handler twice', () =>
				{
					dispatcher.addEventListener(type1, handler1).removeAfter(2);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('1a1a');
				});

				it('it should execute the handler once', () =>
				{
					dispatcher.addEventListener(type1, (event:IEvent) =>
					{
						output += 'x' + event.type;
						event.remove();
					});
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);
					dispatcher.dispatchEvent(event1);

					expect(output).toBe('xa');
				});

				it('should bubble the event', () =>
				{
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=child eventPhase=2 -handler4: target=child currentTarget=parent eventPhase=3');
				});

				it('should not bubble the event', () =>
				{
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);

					child.dispatchEvent(new BasicEvent(type1));

					expect(output).toBe(' -handler4: target=child currentTarget=child eventPhase=2');
				});

				it('should bubble the event and execute the parent handler in capture phase', () =>
				{
					parent.addEventListener(type1, handler4, true);
					child.addEventListener(type1, handler4);

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=parent eventPhase=1 -handler4: target=child currentTarget=child eventPhase=2');
				});

				it('should bubble the event and execute the parent handler in capture phase and bubbling phase', () =>
				{
					parent.addEventListener(type1, handler4, true);
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=parent eventPhase=1 -handler4: target=child currentTarget=child eventPhase=2 -handler4: target=child currentTarget=parent eventPhase=3');
				});

				it('should stop the propagation', () =>
				{
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);
					child.addEventListener(type1, (event:IEvent) =>
					{
						event.stopPropagation();
					});

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=child eventPhase=2');
				});

				it('should stop the propagation, but handle the parent in the capture phase', () =>
				{
					parent.addEventListener(type1, handler4, true);
					child.addEventListener(type1, handler4);
					child.addEventListener(type1, (event:IEvent) =>
					{
						event.stopPropagation();
					});

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=parent eventPhase=1 -handler4: target=child currentTarget=child eventPhase=2');
				});

				it('should stop the propagation, but handle the parent in the capture phase, not in the bubbling phase', () =>
				{
					parent.addEventListener(type1, handler4, true);
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);
					child.addEventListener(type1, (event:IEvent) =>
					{
						event.stopPropagation();
					});

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=parent eventPhase=1 -handler4: target=child currentTarget=child eventPhase=2');
				});

				it('should stop the propagation in the capture phase', () =>
				{
					parent.addEventListener(type1, handler4, true);
					parent.addEventListener(type1, handler4);
					child.addEventListener(type1, handler4);
					parent.addEventListener(type1, (event:IEvent) =>
					{
						event.stopPropagation();
					}, true);

					child.dispatchEvent(new BasicEvent(type1, true));

					expect(output).toBe(' -handler4: target=child currentTarget=parent eventPhase=1');
				});

				it('should throw an error', () =>
				{
					dispatcher.dispatchEvent(event1);

					expect(() => event1.remove()).toThrow();
					expect(() => event1.stopPropagation()).toThrow();
					expect(() => event1.stopImmediatePropagation()).toThrow();
				});

				it('should create a clone of the event when dispatching the event for the second time', () =>
				{
					dispatcher.addEventListener(event1.type, (event:IEvent) =>
					{
						expect(event).toEqual(event1);
						event.remove();

					});
					dispatcher.dispatchEvent(event1);
					dispatcher.addEventListener(event1.type, (event:IEvent) =>
					{
						expect(event).not.toEqual(event1);
					});
					dispatcher.dispatchEvent(event1);
				});

				it('should create a clone of the event when it\'s bubbled', () =>
				{
					var bubbledEvent:BasicEvent = new BasicEvent(type1, true);

					child.addEventListener(type1, (event:IEvent) =>
					{
						expect(event).toEqual(bubbledEvent);

					});
					parent.addEventListener(type1, (event:IEvent) =>
					{
						expect(event).not.toEqual(bubbledEvent);
					});

					child.dispatchEvent(bubbledEvent);
				});

				it('event state should be correct', () =>
				{
					var bubbledEvent:BasicEvent = new BasicEvent(type1, true);

					child.addEventListener(type1, (event:IEvent) =>
					{
						expect(bubbledEvent.state).toEqual(EventState.ACTIVE);
						expect(event.state).toEqual(EventState.ACTIVE);

					});
					parent.addEventListener(type1, (event:IEvent) =>
					{
						expect(bubbledEvent.state).toEqual(EventState.ACTIVE);
						expect(event.state).toEqual(EventState.ACTIVE);
					});

					expect(bubbledEvent.state).toEqual(EventState.NEW);
					child.dispatchEvent(bubbledEvent);
					expect(bubbledEvent.state).toEqual(EventState.OLD);
				});

			}))));