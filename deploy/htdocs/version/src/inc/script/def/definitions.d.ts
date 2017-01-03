// import custom definition files here

/// <reference path="bluebird/bluebird.d.ts" />
/// <reference path="touch/touch.d.ts" />
/// <reference path="history/history.d.ts" />
/// <reference path="facebook/facebook.d.ts" />
/// <reference path="promise/promise.d.ts" />
/// <reference path="sockjs/sockjs.d.ts" />
/// <reference path="polyfill/polyfills.d.ts" />
/// <reference path="knockout/knockout.mediamonks.d.ts" />
/// <reference path="greensock/greensock.draggable.d.ts" />
/// <reference path="greensock/greensock.throwprops.d.ts" />
/// <reference path="greensock/greensock.splittext.d.ts" />
/// <reference path="bowser/bowser.d.ts" />

// export files as typescript module in which a javascript define() is used instead of a typescript export.
// this way they can be imported as "import externals from "lib/externals";" in a typescript file.
declare module "lib/externals"
{
	// dummy export, needed for not removing the import
	var ext:any;
	export default ext;
}

declare module "lib/polyfill/polyfills"
{
	// dummy export, needed for not removing the import
	var ext:any;
	export default ext;
}

declare module "app/config/config"
{
	// dummy export, needed for not removing the import
	var cfg:any;
	export default cfg;
}

declare module "vendor/xregexp/xregexp"
{
	// dummy export, needed for not removing the import
	var cfg:any;
	export default cfg;
}


// declare global libaries and variables that have no typescript definitions
declare var DEBUG:boolean;
declare var RELEASE:boolean;
declare var isMobile:boolean;
declare var XRegExp:any;

declare type Class = any;
declare type Enum = any;
declare type int = number;
declare type uint = number;
declare type float = number;
declare type URI = string;