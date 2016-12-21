import AbstractComponentController from "../temple/component/AbstractComponentController";
import AbstractComponentViewModel from "../temple/component/AbstractComponentViewModel";

interface IKnockoutComponentOptions {
	// name of the component (dashed, not camelCase, e.g. 'my-super-component')
	name:string;

	// should be the root of the template (usually $root).
	// if you are in a knockout foreach, the scope is the $data of the foreach iteration
	// so you need to provide a $root which points to your viewmodel
	root:AbstractComponentViewModel<any, any>;

	// can be anything (string, object, number, etc).
	// passed to the component's constructor
	options:any;

	// called when creation of the component is complete
	onReady:(component:AbstractComponentController<any, any>) => void;

	// called when creation of the component and all his sub-components are complete
	onComplete:(component:AbstractComponentController<any, any>) => void;
}

export default IKnockoutComponentOptions;