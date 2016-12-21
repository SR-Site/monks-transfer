import ko = require('knockout');
import EventDispatcher = require("lib/temple/event/EventDispatcher");

import Scrollbar from 'lib/temple/component/Scrollbar';

/**
 * ## Custom Scrollbar Knockout Binding.
 * ### Requirements
 * - Scrollbar
 * - Draggable
 * 
 * ### Getting started
 * To get started using the scrollbar binding create a html structure like this:
 * ```html
 * <div class="scroll-wrapper" data-bind="scrollbar: {}">
 *     <div class="scroll-content" data-scroll-content>
 *
 *          <div data-content-inner>
 *              Scrollable Content Here
 *          </div>
 *
 *     </div>
 *     <div class="scroll-bar" data-scroll-bar>
 *         <span class="knob" data-scroll-knob></span>
 *     </div>
 * </div>
 * ```
 * 
 * Inside the {} you can put the options you want to pass through to the Scrollbar instance
 * 
 * ### Updating scroll bar
 * The scroll bar class is saved in the ko.domData of the scroll-wrapper element.
 * You can use the class like this:
 * 
 * ```typescript
 * var scrollWrapper = <HTMLElement>document.querySelector('.scroll-wrapper');
 * 
 * // Select the class
 * var controller:Scrollbar = ko.utils.domData.get(scrollWrapper, 'scrollbar');
 * 
 * // Update the scroll bar
 * ko.utils.domData.get(scrollWrapper, 'scrollbar').update();
 * ```
 * 
 * @class KnockoutScrollbar
 */

class KnockoutScrollbar
{
    static init(element, valueAccessor:() => any, allBindings, vm, bindingContext):any
    {
        var value = valueAccessor();

        if (typeof value !== 'object')
        {
            value = {};
        }

        var scrollbar = new Scrollbar(element, value);

        ko.utils.domData.set(element, 'scrollbar', scrollbar);

        // Cleaning up the Scrollbar instance
        var disposeCallback = () =>
        {
            ko.utils.domNodeDisposal.removeDisposeCallback(element, disposeCallback);
            scrollbar.destruct();
            scrollbar = null;
            ko.utils.domData.set(element, 'scrollbar', null);
        };
        ko.utils.domNodeDisposal.addDisposeCallback(element, disposeCallback);

        return {};
    }
}

ko.bindingHandlers['scrollbar'] = KnockoutScrollbar;
ko.virtualElements.allowedBindings['scrollbar'] = true;


