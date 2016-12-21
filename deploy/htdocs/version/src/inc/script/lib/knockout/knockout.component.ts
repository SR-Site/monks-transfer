import ko = require('knockout');

import IComponentBundle from "lib/temple/component/IComponentBundle";
import IKnockoutComponentOptions from "lib/knockout/IKnockoutComponentOptions";
import StringUtils from "lib/temple/util/type/StringUtils";
import AbstractComponentViewModel from "../temple/component/AbstractComponentViewModel";
import AbstractComponentController from "../temple/component/AbstractComponentController";
import jQuery = require('jquery');

// the knockout binding can either be a string or an object
declare type KnockoutComponentOptions = string | IKnockoutComponentOptions;

interface ICompleteBranch
{
	onComplete: ICallback;
	children: Array<ICompleteBranch>;
	parent: AbstractComponentViewModel<any, any>;
	viewModel?: AbstractComponentViewModel<any, any>;
}

export interface ICallback
{
	(controller: AbstractComponentController<any, any>): void;
}

class KnockoutComponent
{
	public static baseDir: string = 'app/component/';

	private static _onCompleteTree: {[viewModelId: string]: ICompleteBranch} = {};

	public static init(element, valueAccessor: () => any): any
	{
		// Added this because when we modify the component id it actually updates the reference as well,
		// if we use JSON.stringify() to clone it we will destroy the onComplete methods
		let value: KnockoutComponentOptions = $.extend(true, {}, valueAccessor());

		let componentId: string;
		let componentIdCamelCasePath: string;
		let componentIdCamelCase: string;
		let componentBaseDir: string;
		let options: any;
		let onReady: ICallback;
		let onComplete: ICallback;
		let rootViewModel: AbstractComponentViewModel<any, any>;
		let path = '';

		let $element = jQuery(element);

		// if applyBinding is called from the component, it will try to create a new instance
		// so skip if we already have a component
		if($element.data('component_loading') !== void 0 || $element.data('component') !== void 0)
		{
			return;
		}

		// parse 2 different types
		// basic string with ID
		if(typeof value === 'string')
		{
			componentId = value;
		}
		// or object with multiple properties
		else
		{
			componentId = value.name;

			if(value.root && value)
			{
				rootViewModel = value.root;
			}
			if(value.options)
			{
				options = value.options;
			}
			if(value.onReady)
			{
				onReady = value.onReady;
			}
			if(value.onComplete)
			{
				onComplete = value.onComplete;
			}
		}

		componentIdCamelCasePath = StringUtils.camelCase(componentId);
		componentIdCamelCase = StringUtils.camelCase(componentId.split('/').pop());

		if(options)
		{
			options.id = componentIdCamelCase;
		}
		else
		{
			options = {
				id: componentIdCamelCase
			};
		}


		if(!rootViewModel)
		{
			rootViewModel = ko.contextFor(element).$root;
		}

		// Store onComplete callback together with a list of all children components
		const completeBranch: ICompleteBranch = {onComplete: onComplete, children: [], parent: rootViewModel};

		// And store this info at the parent
		if(KnockoutComponent._onCompleteTree[rootViewModel.eventNamespace])
		{
			KnockoutComponent._onCompleteTree[rootViewModel.eventNamespace].children.push(completeBranch);
		}

		if(componentId.split('/').length > 1)
		{
			const parts = componentId.split('/');
			componentId = parts.pop();
			componentIdCamelCasePath = StringUtils.camelCase(componentId);
			path = parts.join('/') + '/';
		}

		componentBaseDir = KnockoutComponent.baseDir + path + componentId + '/';

		require([
			componentBaseDir + componentIdCamelCasePath + 'Bundle'
		], (bundle: IComponentBundle) =>
		{
			const controller: Class = bundle.controller;
			const viewModel: Class = bundle.viewmodel;
			const template: string = bundle.template;

			const vmInstance: AbstractComponentViewModel<any, any> = <AbstractComponentViewModel<any, any>> new (viewModel)();
			const controllerInstance: AbstractComponentController<any, any> = <AbstractComponentController<any, any>> new (controller)(element, options || {});

			// Store onComplete info for this component in the tree
			completeBranch.viewModel = vmInstance;
			KnockoutComponent._onCompleteTree[vmInstance.eventNamespace] = completeBranch;

			controllerInstance.setViewModel(vmInstance);
			controllerInstance.setTemplate(template);

			const disposeCallback = () =>
			{
				ko.utils.domNodeDisposal.removeDisposeCallback(controllerInstance.element, disposeCallback);
				controllerInstance.destruct();
			};

			ko.utils.domNodeDisposal.addDisposeCallback(controllerInstance.element, disposeCallback);

			controllerInstance.parent = ko.contextFor(element).$root.controller;
			controllerInstance.init();

			if(onReady !== void 0)
			{
				onReady(controllerInstance);
			}

			let branch: ICompleteBranch = completeBranch;

			// if children list is empty, this component is complete
			while(branch && branch.children.length === 0)
			{
				if(branch.onComplete)
				{
					branch.onComplete(branch.viewModel.controller);
				}
				// remove from tree
				delete KnockoutComponent._onCompleteTree[branch.viewModel.eventNamespace];

				// get parent
				const parent: ICompleteBranch = KnockoutComponent._onCompleteTree[branch.parent.eventNamespace];

				// Clear properties
				branch.onComplete = null;
				branch.children = null;
				branch.parent = null;
				branch.viewModel = null;

				// remove from parent
				if(parent)
				{
					const index: number = parent.children.indexOf(branch);
					if(index !== -1)
					{
						parent.children.splice(index, 1);
					}
					else
					{
						throw new Error("Not in parents children list");
					}
				}
				branch = parent;
			}

		});

		return {controlsDescendantBindings: true};
	}
}

ko.bindingHandlers['component'] = KnockoutComponent;
ko.virtualElements.allowedBindings['component'] = true;
