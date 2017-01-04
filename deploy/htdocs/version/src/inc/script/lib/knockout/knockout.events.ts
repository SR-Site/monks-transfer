import ko = require('knockout');
import EventDispatcher = require("lib/temple/event/EventDispatcher");

/**
 * ## Custom events binding
 * Use variables as the event key, IE does not allow the following:
 *
 * data-bind="event: {
 *     [MouseEvents.CLICK]: $root.handleClick.bind($root),
 *     [MouseEvents.MOUSE_ENTER]: $root.handleMouseEnter.bind($root)
 * }"
 *
 * because we still want to use the variables as the key we created a custom binding:
 *
 * data-bind="events: [
 *     [MouseEvents.CLICK, $root.handleClick.bind($root)],
 *     [MouseEvents.MOUSE_ENTER, $root.handleMouseEnter.bind($root)],
 * ]"
 *
 */
class KnockoutEvents
{
	static init(element, valueAccessor:() => any, allBindings, vm, bindingContext):any
	{
		var value = valueAccessor();

		for(var i = 0; i < value.length; i++)
		{
			var event = value[i];
			ko.utils.registerEventHandler(element, event[0], event[1]);
		}

		// Make a modified binding context, with a extra properties, and apply it to descendant elements
		var innerBindingContext = bindingContext.extend(valueAccessor);
		ko.applyBindingsToDescendants(innerBindingContext, element);

		// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
		return { controlsDescendantBindings: true };
	}
}

ko.bindingHandlers['events'] = KnockoutEvents;
ko.virtualElements.allowedBindings['events'] = true;
