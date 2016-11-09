# Change Log

All notable changes to this project will be documented in this file.

## [2.8.0] - 2016-01-22

### Release Notes

#### CSS Mixin for aspect-ratio

    @mixin aspect-ratio($width: 1, $height: $width, $relative: true) {
    
      @if $relative == true {
        position: relative;
      }
    
      &:before {
        content: '';
        display: block;
        padding-top: ($height / $width) * 100%;
      }
    }

#### TypeScript definitions for ES Next methods

We have a lot of polyfills in the skeleton for ES6/7 methods, but the built-in
TypeScript definitions were not completely up-to-date. Now we have definitions
for all the usable methods (so no typing `array['find'](..)` anymore!

#### Flag Class

For all developers that are not completely comfortable with using bit-flags, or
don't want to repeat themselves, you can now make use of Flag class.

    enum PizzaIngredients {
     BREAD = 1 << 0,
     CHEESE = 1 << 1,
     TOMATO = 1 << 2,
     UNIONS = 1 << 3,
     GARLIC = 1 << 4,
    }
    
    var PizzaMozzarella = PizzaIngredients.BREAD | PizzaIngredients.TOMATO | PizzaIngredients.CHEESE;
    var GarlicBread = PizzaIngredients.BREAD | PizzaIngredients.GARLIC;
    
    var pizza = new Flag<PizzaIngredients>();
    pizza.add( PizzaIngredients.BREAD | PizzaIngredients.TOMATO | PizzaIngredients.CHEESE );
    
    pizza.equals(PizzaMozzarella); // true
    pizza.contains(GarlicBread); // true
    pizza.add(GarlicBread); // true
    pizza.equals(PizzaMozzarella); // false because contains no garlic

#### TSD issues

On some environments (both Windows and Linux) the npm postinstall script
`grunt tsd:install` fails. This has prevented the deploy tool from deploying,
and definitions are not correctly installed on some development environments.

The postinstall script is currently disabled and the .d.ts files installed by
TSD are added to the repository. If we can find a solution to this issue we may
reenable TSD and remove the .d.ts files again.

It is still possible to install .d.ts files using TSD since the TSD config file
is still present.


#### UglifyJS filesize improvements

In UglifyJS (that we are using to comperess our release JS files), there is an
option to remove all comments, but only keep license banners. This functionality
wasn't working (anymore), so we added our own checker function.

**This fix decreases the output bundle.js by 30%, so it might be wise to update
the `tools/build/grunt/uglify.js` file in your current project!**

#### TypeScript 1.7.5

From version 1.5.3, so a few big updates!

TypeScript 1.6:

* [Release anouncement](http://blogs.msdn.com/b/typescript/archive/2015/09/16/announcing-typescript-1-6.aspx)
* [What's new](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-16)
* [Breaking changes](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-16)

TypeScript 1.7:

* [Release anouncement](http://blogs.msdn.com/b/typescript/archive/2015/11/30/announcing-typescript-1-7.aspx)
* [What's new](https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#typescript-17)
* [Breaking changes](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#typescript-17)

#### Unit tests

We added some more unit tests, improved the folder structure of the test to
mimic the original code, and we are now running the tests during a release
build, so you know when something breaks!

#### Default border-box

Sets a box-sizing: border-box on all elements. Based on the new standard, but
modified to our needs.

    ,
    :before,
    :after {
        box-sizing: border-box;
    }

#### No .js and .css files in git

We finally made the step to ignore all generated in git, so no conflicts on .js
and .css files anymore!

**Now you need to make sure you do a `grunt ts` and `grunt css` after you pull in
changes from others, or else you might run outdated code in your browser.**


### Fixed

- [#334 - Cookie.remove was setting the cookie to the string 'null' instead of removing it](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2639743) (Stuart)
- [#317 HOTFIX - Fix typing error in ShareUtil](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2694453) (Floris)
- [HOTFIX #317 - Fix ShareUtil event target](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2712653) (Floris)
- [HOTFIX #331 - Remove leading slash from branches](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2716233) (Floris)
- [#338 HOTFIX - Fix typing for the snap and liveSnap function in draggable.d.ts](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2722243) (Lars)
- [HOTFIX tsd is causing install issues on some environments](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2722093) (Mient-jan)
- [HOTFIX: updated import of Log class to new folder (singular name)](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2726963) (Thijs)
- [#378 - path to AbstractPageViewModel in requirejs task is incorrect](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2765173) (Stuart)
- [#337 - grunt-contrib-uglify was not removing any comments](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2765133) (Stuart)


### Added

- [#338 Add typing for draggable, throwprops and splittext](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2662493) (Lars)
- [#265 - Add aspect-ratio mixin](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2648453) (Stuart)
- [#339 Add TypeScript definitions for each polyfilled JS method](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2694703) (Floris)
- [#349 - Add 'isTransitioning' method to TransitionController](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2706543) (Thijs)
- [#347 - Merge Flag class into skeleton](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2723263) (Mient-jan)


### Changed

- [#342 Update Typescript to version 1.7.5](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2694643) (Floris)
- [Refactor the grunt scaffolding tasks](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2677303) (Floris)
- [#337 - refactor directory layout of test directory](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2660263) (Stuart)
- [#345 - run unit tests on release build](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2700763) (Stuart)
- [#329 - Gateway setOptions update](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2616233) (Thijs)
- [#351 - Add 'hasEventListener' check in AbstractPageController](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2706583) (Thijs)
- [#263 - Set box-sizing default to border-box for all HTML Elements](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2701983) (René)
- [#344 - Refactor abstract controllers and viewmodels to be abstract generic classes](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2698783) (Floris)
- [#277 - Update Skeleton for Coding Standards](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2706343) (Thijs)
- [#362 - Change namespace of Log instance in component template to lowercase](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2727353) (Stuart)
- [#350 - Added js rules to .gitignore & removed js files](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2765903) (Robert)
- [#359 - Set references to viewModel on controller to be 'protected' instead of 'public'](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2746303) (Floris)


## [2.7.0] - 2015-11-21

### Release Notes

#### Share variables between SCSS and JS using a node-sass importer

A node-sass importer script that allows sharing of data between TypeScript and node-sass. A DeviceStateTracker utility
class to show how to use this feature has also been added.

There are multiple reasons we might want to share variables between our javascript and css without defining them twice.
Node-sass importers allow us to read external files when compiling our SCSS. This way, we can import a JS module that
can also be read by our JS.

`inc/script/data/scss-shared/MediaQueries.ts` now contains the mediaQueries used in SCSS and TypeScript.

`inc/script/lib/temple/utils/DeviceStateTracker.ts` contains observables and utility functions for dealing with changing
mediaQueries.

A `grunt css` task has been created to run both `grunt sass` and `grunt postcss`. `grunt sass` has been updated to pass
the mediaQeries from TypeScript to the node-sass compiler.

**Note**: From now on, you should use the `grunt css` as FileWatcher in WebStorm (replacing the current node-sass and
postcss tasks).


#### Namespaced logging utility

The new Log class is a replacement of the current private _debug flags and the current DEBUG usage, when logging
information. It allows you to create a log instance for your class, provide a namespace, and it exposes most of the
Console.API methods (e.g. log, debug, info, warn, error and others).

It uses the namespace to allow or block the logs, checking it against a glob pattern set in a cookie (`__debug__`)
and execute the Console API method when the namespace matches the pattern. It will add the namespace to the log output.

It also adds date/time stamping, and logging time since last Console API call (these features are optional, and off by
default). All additional information has a lighter color (in Chrome) for better contrast.

    var log = new Log('MyUtility.SomeComponent', 
        showNamespaceString: true,
        time: true,
        date: true,
        timeDiff: true,
        color: '#8c8c8c'
    });
    log.log('Hello World!');
    // [MyUtility.SomeComponent] [03-02-1970 12:00:00] [200ms] Hello world!


#### TSD support

TSD is a package manager for TypeScript definitions. It allows you to install TypeScript definitions from the command
line. Much like NPM, it allows you to store which definitions your project uses in a `tsd.json` file. Running
`tsd install` will install all the definition files listed in `tsd.json` (located in `/tools/build`).

Our definition files are stored in a separate directory instead of alongside the actual library files (`script/def/*`).
Inside that folder we will have a `local` folder for our own definition files, and `tsd` folder where definition files
installed with the TSD tool are copied.

The current `definitions.d.ts` and `ReferenceDefinitions.ts` are still used.

The new folder structure will be as follows:

    script
    |- app
    |- lib
    |- def
       |- definitions.d.ts          # imports tsd/tsd.d.ts and local/local.d.ts
       |- ReferenceDefinitions.ts   # same as our current ReferenceDefinitions.ts file
       |- tsd                       # contains definition files installed by tsd
       |  |- tsd.d.ts               # imports definitions installed by tsd (this file is automatically generated by tsd)
       |- local                     # contains definition file amends
       |  |- local.d.ts             # imports definition files created by us


All files under `script/def/tsd` are ignored by git.

A grunt task for installing tsd definitions is available (`grunt tsd`), and will be automatically executed when running
`npm install`.


#### jQuery deprecated methods

In a previous update we created a custom jQuery build, removing all modules we are not using. It appears that there are
still some libraries (Knockout, jQuery Mobile) using the long deprecated `bind` method. This update will put back the
`deprecated` module, containing 4 aliases (bind, unbind, delegate, undelegate).


#### jQuery Mobile

In a previous update where we updated jQuery, we lost jQuery Mobile (which was bundled in the same file to fix AMD
issues). We now have put back (a custom build, with only the basic stuff) of jQuery Mobile, so you can use `tap` again.


#### PanoramaVideoElement

PanoramaVideoElement extends VideoElement and renders the 360-distorted video to canvas using webgl.


#### Throttle and debounce

Because it is often good practice to throttle and debounce input event handlers, it is nice to have a utility for this
in temple.


#### ScrollTracker utility

- Can track scrolling of a specific element or the window
- Can track horizontal or vertical scrolling
- Shows at which side the element scrolled in or out of view

Usage:

    import {ScrollTracker, ScrollTrackerEvent, Side, Axis} from "lib/temple/utils/ScrollTracker";
    
    // ------- Create a ScrollTracker instance
    var scrollTracker = new ScrollTracker(window, Axis.Y);
    
    // ------- Add points you want to track
    
    // 200 pixels from the top
    var myPoint = scrollTracker.addPoint(200);
    // 500 pixels from the bottom
    scrollTracker.addPoint(500, Side.BOTTOM);
    
    // ------- listen for events
    
    // for a specific point, entering view
    myPoint.addEventListener(ScrollTrackerEvent.ENTER_VIEW, (event:ScrollTrackerEvent) => {
        
    });
    // for all points, leaving view
    scrollTracker.addEventListener(ScrollTrackerEvent.LEAVE_VIEW, (event:ScrollTrackerEvent) => {
        var point = event.point;
    });


#### Image sequence/spritesheet

Sometimes we have projects that need a small image sequence animation or cinematic.

Libs like EaselTS or Pixi are great, but I think for these cases where you just want to execute an image sequence would
be great to have a small manager under a few kb's that does the work. The main idea of this is to keep under a few kb's
a simple manager to do a specific task, play image sequence/spritesheets.

The library has the following:

- LightCinematic (Cinematic class)
- LightManager (Manager class)

You can use it independently, creating a cinematic object without using the manager and run it on your own. The manager
provides the main loop keeping all cinematics running as well as memory pool functionality reusing objects if you need.


#### Rewrite ShareUtils to be modular and use Knockout

Previously we had a fairly basic ShareUtils class that could share to FB, Twitter an email.

Now we have a new modular setup, where you can define share info on a parent container, or each individual share link,
by using a knockout binding.

Some basic examples:

    <button type='button' data-bind='share : {method : 'facebook', url : 'http://url-to-share.com/'}'>Share</button>
    
    this.twitterSharer.share({
        text : 'Copy to tweet'
    });


#### ElementResizer

A helper class to fit and align elements within containers, using the same cover/contain as the CSS background-size
property.

    new ElementResizer(
        $('.element')[0], // element to resize 
        100,  // element width
        200,  // element height
        ScaleMode.COVER,  // scaleMode
        $('.container')[0] // bounds container
    );

### Fixed

- [#292 - Add deprecated jquery methods for backward compatibility](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2484043) (Narie)
- [#279 - Add jQuery Mobile](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2484053) (Narie)
- [#313 - Upgrade bluebird to latest version with correct modules](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2484063) (Narie)
- [#313 HOTFIX - Add missing cancel module to bluebird](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2533153) (Narie)
- [#301 - Fix a issue on iOS devices that are triggering a popstate on first load](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2333543) (Jesse)
- [#176 - Move karma test unit to tools/test](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2575253) (Narie, Mient-jan)


### Added

- [PanoramaVideoElement is ready to merge](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2396073) (Reinder)
- [Add a utility class for method throttle and debounce](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2379143) (Floris)
- [Add ScrollTracker utility class to detect when points enter or leave view]() (Floris)
- [This feature is an util class(es) for simple image sequence/spritesheet canvas based animations.]() (Victor)
- [#271 - added support for TSD](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2099303) (Stuart)
- [#272 - add namespaced logging utility](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2118783) (Stuart)
- [#323 - add more use of Log in temple/gaia/skeleton](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2520383) (Stuart)
- [#299 - Share variables between SCSS and JS using a node-sass importer](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2486483) (Floris)
- [#324 - Add ElementResizer - implementation of background-size: cover/contain in TypeScript](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2521613) (Stuart, Narie)
- [#328 - Add RectangleUtils.intersection and left/right/top/button helper functions](https://www.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2599463) (Narie)


### Changed

- [Update meta viewport tag](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2372773) (René)
- [#318 - component: rename keys 'component' and 'callback' to 'name' and 'onReady' in component options object](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2503583) (Stuart)
- [#312 - generated component controller's constructor options argument was typed as any](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2507303) (Stuart)
- [#319 - create-component task was generating classes with old style imports/exports when using the --events flag](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2507383) (Stuart)
- [#321 - rename scss files so their filenames start with underscores](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2507933) (Stuart)
- [#320 improve method signatures in page and component class templates](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2507773) (Stuart)
- [#326 - Move third party libraries to vendor folder](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2571553) (Narie)
- [Rewrite ShareUtils to be modular and use Knockout](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2580333) (Floris)
- [#322 - Change the default values of the pos Mixin](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/git-2/merge_requests/2534673) (Eelke)



## [2.6.2] - 2015-10-13

### Release Notes

#### TypeScript 1.5

We finally moved over to TypeScrpit 1.5. This brings us a lot of new features and changes some workflows. View the
[release notes](http://blogs.msdn.com/b/typescript/archive/2015/07/20/announcing-typescript-1-5.aspx) for more
information. In short; new es6 syntax, new es6 module format that fixes circular dependency issues, and the introduction
of the tsconfig.json file to manage all compiler settings.

Your project will now have a `inc/sript/tsconfig.json` file that the new build-in WebStorm TypeScript compiler can use to
get its settings from. This will eliminate the different compiled code between developers (sourcemaps, ts version,
comments, etc). Once the grunt-ts plugin has support for the tsconfig.json we will implement that there as well.

If you use the build-in TS compiler, please edit your Compiler Version in the settings to use a Custom Directory and
select the `tools/build/node_modules/typescript/bin` folder, so the TS version matches your project.

#### scss-lint

We've added a `tools/build/.scss-lint.yml` file that contains linting rules that you can change or add/remove. For
scss-lint to work you have to install the ruby sass version, the ruby scss-lint gem, and the scss-lint WebStorm plugin.
Checkout the [Workspace setup wiki page](https://www.assembla.com/spaces/mediamonks-front-end-tools/wiki/Workspace_setup)
for install instructions. You can run `grunt scsslint` to test it manually, or install the WebStorm plugin to see lint
warnings while you code.


### Fixed

- [#267 - Add "setOptions" method to IGateway](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2097903) (Jonas)
- [#268 - Change "Imanifest" to "IManifest"](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2097983) (Jonas)
- [#269 - Change "Knockout" to "knockout"](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2098143) (Jonas)
- [#270 - A change to IResult caused a compile error on SocketService](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2098183) (Stuart)
- [HOTFIX: updated compiled JS files](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2256693) (Thijs)
- [#274 - LocaleProvider breaks on json non-string values](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2256303) (Rick)
- [#280 - Alias for routing is not working](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2227593) (Thijs)
- [#293 - URLUtils.getParameter should do a decodeURIComponent before returning the value](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2274713) (Thijs)
- [#296 Fix the scaffold pages and create-component tasks](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2289543) (Lars)
- [#297 - create-component bundle.js was not yet updated for new TypeScript 1.5 'default' exports](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2293503) (Stuart)
- [Fix grunt release issues](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2356733) (Jesse)
- [#hotfix, added new compiled javascript files, conform to new compiler](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2294373) (Mient-jan)
- [#308 - Fix the IE check in the history.js lib](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2377333) (Lars)


### Added

- [#283 - Add support for textarea in KnockoutValidator](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2246893) (Thijs)
- [#276 - Add 'URI' type declaration as alias for string](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2192113) (Thijs)
- [#256 - Add 'int', 'uint' and 'float' as aliases for number](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2192093) (Thijs)
- [#160 - How to name and type a reference to a Class?](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2192063) (Thijs)
- [#59 - Adding Media Element](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2020103) (Mient-jan)
- [#287 - Implement PageEvent.BEFORE_INIT in Gaia](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261813) (Thijs)
- [#288 - Add PopupQueue util for Gaia](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261943) (Thijs)
- [#266 - Add scss-lint](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2096763) (Narie)


### Changed

- [#257 - Renamed Page to Branches](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2153673) (Stuart)
- [#226 - Type class update](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2192053) (Thijs)
- [#278 - Rename 'CustomAbstractController' to 'DefaultPageController' and 'DefaultViewModel' to 'DefaultPageViewModel'](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2192493) (Thijs)
- [#226 - Type class update](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261503) (Thijs)
- [#290 - Rename SiteController.getBusy() to SiteController.isBusy()](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261893) (Thijs)
- [#286 - Seperate GaiaEvents to single event class files](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261753) (Thijs)
- [#285 - Rename Controllers and ViewModels of a Page to PageController and PageViewModel](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2261643) (Thijs)
- [#250 - Moving to typescript 1.5.3](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2283133) (Narie, Mient-jan)
- [#303 - Rename Param to Params](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2332853) (Thijs)


### Removed

- [Deleted old js files](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2242073), [Deleted old js files](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2237513), [Deleted old js files](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2231623) (Thijs)
- [#65 - Removed FormValidator](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2153453) (Stuart)


## [2.6.1] - 2015-07-18

### Release Notes

#### cssmin and uglify Hotfix

With the versioning change in 2.5.0 most of the grunt configs were updated to use the new paths, but cssmin and uglify
got left behind, so they operated in non-existing folders, which means your build didn't get minfied at al!

[This commit](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/commit/f648cd9024bf1f3cd453b191252125874df1c925)
fixes it, please **update your current projects** if you are running skeleton >= 2.5.0 (check your package.json).

#### node.js dev server

If you don't have apache/php running, you can also use 'grunt server' to start a node.js server on port 3333. The index
template is currently located at tools/build/tasks/server/index.ejs.

### Fixed

- [#240 - Grunt docs is broken](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2049863) (Narie)
- [#232 HOTFIX - cssmin and ugligy didn't run at all, now they do](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2071473) (Narie)

### Added

- [#259 - Add support for serving the Skeleton with Node](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2030263) (Jonas)


## [2.6.0] - 2015-07-09

### Release Notes

#### jit-grunt bugfix

The new jit-grunt 0.9.1 had a regression that required us to explicitly set the pluginRoot in the Gruntfile.js.
If running grunt fails on "jit-grunt: Plugin for the "availabletasks" task not found." in your current project,
please apply the change in [84f864](https://mediamonks.assembla.com/code/agFz0QuVCr4yIiacwqjQYw/c4WHr8p1er5io9acwqEsg8/commit/84f864b8277caef0243898a468f4e2b0eb5af827).

#### Replace mootools with polyfills

The only reason we had MooTools laying around was for the array/string/object/function polyfills, but it also included
a lot of stuff that we didn't use (or that sometimes broke things). We finally have removed MooTools and included all
polyfills in a [structured way](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/nodes/85e8c8268a/deploy/htdocs/version/src/inc/script/lib/polyfills),
so you can easily add/expand your own polyfills.

IE8-only polyfills have been split up into a separate file, so they will not be included by default; you can choose when
to included them only when needed.

#### Update Browser class

By removing MooTools we have extracted the Browser class and applied some updates.
Important note; it's not global anymore, so you have to import it in your classes.

#### Update createjs

The old easeljs package has been removed, only soundjs and preloadjs are left. If you have a Canvas project and want
to use easel, you can get easelts from github. Check the [readme](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/nodes/8beed91f291f363f57572dc21f5c1207f697d369/deploy/htdocs/version/src/inc/script/lib/createjs) in the folder for more information.

#### JQuery 2.x

We updated jQuery to 2.x, as a custom build with only the needed modules, saving some bytes. To give an indication;

 - current:  **103k** (min)
 - default 2.x: **85k** (min)
 - custom 2.x: **75k** (min)

The current modules are not included: -core/ready, -effects, -deprecated, -event/alias. If you need any of those you can
download the default 2.x version.

The 2.x version doesn't support IE8, so if you need to support IE8 you can download the default 1.x version.

 
### Fixed

- [#262 - jit-grunt 0.9.1 has regression for the pluginsRoot](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2043883) (Narie)
- [HOTFIX: Update organize-imports script for better Mac support](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2018063) (Thijs)
- [#261 - Improve HTTPS check](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2030423) (RobertS)

### Added

- [#49 - Add Gaia.api.gotoDeeplink()](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1973023) (Narie)
- [#47 - Add Gaia.api.getRoute()](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1968063) (Narie)
- [#60, #217 - Replace MooTools with polyfills and update the Browser class](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1966173) (Mient-jan, Narie)

### Changed

- [#237 - Clean up of easeljs / createjs / tweenjs / preloadjs](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2008093) (Mient-jan)
- [#80 - Update to jQuery 2.x custom build](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1962143) (Narie)
- [#196 - Implement latest socket connect strategy](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1967323) (Hendrik-jan)
- [#260 - Add documentation for "folder" property in sitemap](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/2030273) (Jonas)

### Removed
- [#174 - Remove old routing from Gaia](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1967663) (Narie)


## [2.5.0] - 2015-06-12

### Release Notes

#### Versioning

Versioning is included in the Skeleton by default now. `inc` is moved to `version/src/inc`.

The output in the build folder is also slightly different, the normal files and folders are now put in the
`build/version` folder, and other files that are changed by Grunt are moved in the `build` folder at their respective
location. When deploying manually you can override these after uploading the `deploy` folder.

More information can be found on the updated [Wiki page](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/wiki/Versioning_-_Anti-caching).

#### npm shrinkwrap

The build tools have a package.json that is used to keep version numbers, installing the correct versions when you run
`npm install`. The used packages are updated regularly, but we can't manage to keep the package.json up-to-date all the
time.
 
That's why we only locked the important packages that could introduce breaking changes (like TypeScript), and for all
other packages will you get the newest versions.

However, within a single project you do want to lock down al versions. That's why you should run `npm shrinkwrap` after
running `npm install` for the first time. This will create a `npm-shrinkwrap.json` file with all the version numbers.
You can commit this file, so all others will get those same versions when they run `npm install`.

The [Create a new project](https://mediamonks.assembla.com/spaces/mediamonks-front-end-tools/wiki/Create_a_new_project)
wiki page is also updated to reflect this additional step.

More information about [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap).

#### Knockout Validation (Floris)

Allows you to validate forms using Knockout.js. The main features are:

- Clean up your template code by moving validation settings to ViewModels
- Validate fields with custom rules
- Validate custom (non-input) html element
- Auto-validate fields on change
- Allows async validation with promises

More info:

- [Docs](http://devmonks.vellance.net/m/mediamonks/frontend_ko_validator_docs/classes/temple.utils.knockoutvalidator.KnockoutValidator.html)
- [Example](http://devmonks.vellance.net/m/mediamonks/frontend_ko_validator_test/validator-test)

#### Autoprefixer

Grunt autoprefixer has been deprecated in favour of grunt-postcss.

https://github.com/nDmitry/grunt-autoprefixer

You should change your autoprefixer file-watcher using `postcss` as argument.

### Added

- [#249 - Update/add LICENSE info](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1937813) (Narie)
- [requestAnimationFrame polyfill](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1639973) (Stuart)
- [#199 - Form validation using Knockout](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818933) (Floris)

### Changed

- [#244 - Migrate autoprefixer to postcss](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1913613) (Ren�)
- [#230 - Use npm shrinkwrap](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818023) (Narie)
- [#230 HOTFIX - switch back to original grunt-ts](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1938703) (Narie)
- [#189 - getDeeplink() should return a clone, instead of the reference](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818713) (Narie)
- [#232 - move inc + data to /version/src/ for default versioning](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1952413) (Narie)

## [2.4.1] - 2015-05-17

### Release Notes

This is a maintenance release, containing fixes introduced in the last version.

### Fixed

- [#238 - Rename "vars" to "variables" in config file](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1877383)
- [#243 - X-Force-Status-Code-200 missing in .htaccess](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1901933)
- [#245 - Typo in knockout.gaia.ts](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1930763)
- [#246 - Add CloudFront HTTPS check to default index.php](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1930773)
- [#248 - fix startup sequence refactor and LocaleGaiaHistoryHook move](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1936973)
- [#247 - IConfigUrl misspelled in ConfigManager](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1936403)

### Added

- [#239 - Add Skeleton readme](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1888653) (Narie)
- [#139 - Skeleton Changelog & Versions](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1888573) (Narie)



## [2.4.0] - 2015-05-17

### Release Notes

#### GaiaHistory and GaiaRouter

All url-related code bas been moved from GaiaHistory to GaiaRouter, and because GaiRouter is created in the StartUp,
the locale in the URL is available in the StartUp. The RegExp to fetch the locale from the URL can now be configured
in Routes.ts.

The onInit function that was in the Main is now moved to the redirectOnLanding() function in config/Routes.ts.
This method can be configured globally on the GaiaRouterConfig and/or custom per individual route.
The passed callback can be called async, so you can even do an API call before continuing or redirecting.

#### requirejs module bundling

Recently, an issue slipped in the skeleton regarding the bundling of components that also include other files,
so you will get 404 on certain JS files when navigating to different pages. The current fix will include all
components in the main bundle.

#### grunt-newer

`newer"` can be prepended to any tasks that has a 1-on-1 input\>output (e.g. `newer:uglify:release`).
Now after a successful grunt the output will be stored in a cache folder (with sha-hash of the source content als filename),
and when doing a new grunt these cache is used for unchanged files, speeding up the grunt process immensely!


### Fixed
- [#201 - Page view removal is not handled by Knockout](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1817653) (Narie)
- [HOTFIX: Fixed GaiaHistory for deeplinking with route without trailing slash](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1820603) (Thijs)
- [#233 - Improve requirejs module bundling - quickfix](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1820943) (Narie)
- [#191 - onDeeplink should not be called when leaving the page](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818073) (Narie)
- [#109 - Organize imports update for quotes strings and negative check](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1834773) (Thijs)
- [#234 - Map local broken on require.js](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1821173) (Narie)
- [#177 - Component destructors being called twice](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1817743) (Narie)
- [#181 - Grunt Scaffold, GaiaSitemap and using Page static var](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818193) (Narie)
- [Fixed Facebook share. Previous notation wasn't working anymore for mobile (see http://stackoverflow.com/a/20366707).](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1843763) (PieterS)

### Added
- [#231 - Remove inc/script/doc folder from release build](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818803) (Narie)
- [#236 - Rewrite grunt-newer to use content-md5 hashes to cache output files in 'grunt release'](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1839704) (Narie)
- [add -q/--quiet mode that doesn't output grunt-time](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1844633) (Narie)

### Changed
- [Refactored GaiaHistory and GaiaRouter](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1347593) (Narie)
- [#169 - title of a page can be optional](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818393) (Thijs)
- [#208 - Sequence update](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1820753) (Thijs)
- [#168 - Typing the GaiaSitemap and rename it](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1818183) (Thijs)
- [#200 - Some Gaia updates](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1682473) (Thijs)

## [2.3.0] - 2015-04-28

### Release notes

#### Gateway update

Big update to the Gateway, implementing promises and ready for the future Spec:

- making use of promises (using [bluebird](https://github.com/petkaantonov/bluebird))
- ready for the upcoming updated Gateway Spec, using input and output handlers to format the data according to the used backend.
- making use of jQuery ajax in favor of MooTools Request, using the JQueryAjaxSettings object as a base for all gateway options.
- some smaller extras (no more duplicate calls, ability for local caching, nice cleanup for running gateway calls on destruct)

The [added documentation should](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/nodes/master/deploy/htdocs/inc/script/app/net/gateway/Gateway.ts#ln14) be enough for you to start using it.

Regarding the old vs new backends, this can be [changed here](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/nodes/master/deploy/htdocs/inc/script/app/control/StartUp.ts#ln56).

For current/old versions, use this inputhandler:

- `app/net/gateway/input/LegacyInputHandler`

And either of these outputhandlers:

- `app/net/gateway/output/JSONOutputHandler` (Legacy from Flash, mixed form/json)
- `app/net/gateway/output/PostOutputHandler` (Mostly used in JS, mimics forms)

### Changed

- [New Gateway with Promises and REST API Spec](https://www.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1802543)


## [2.2.1] - 2014-12-10

### Release notes

#### grunt-ts

For TypeScript 1.x we switched from grunt-typescript to grunt-ts because of compiler changes that broke the plugin.

However, in a newer version of TS they changed the tsc exit code, this broke the new plugin in a way that it doesn't exit grunt when certain types of compile errors occurred.
It does show the errors, but when the .js file can be written it doesn't quit as failed.

There is a pull-request open for that fix, but it could take a couple of weeks before that gets included. Therefor I forked the grunt-ts plugin and made the changes there and used that version in the Skeleton's package.json.

##### For new projects
It's included by default, don't worry!

##### For excising projects

- change your package.json like in [this commit](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/commit/3ae8963b56fb12720464eea1ac9e45790937563f)
- delete your `tools/build/node_modules/grunt-ts` folder
- run `npm install` from your `tools/build` folder

### Changed

- [Changes to grunt-ts](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1337413) (Narie)

## [2.2.0] - 2014-12-09

### Release notes

#### Component bundling

When creating a component with the Grunt create-component task you'll notice that a new file has been added called
ComponentNameBundle.js. This file serves mainly for importing the component's template, controller and viewmodel and
passing that to the Knockout.Component binding. Knockout.Component will load the bundle.js, and the bundle will load
the controller, viewmodel and template. This allows you to optionally not import the template file for components that
don't need it, which in turn reduces HTTP requests.

This change also means that components can be bundled into one single file when building the project with Grunt.
The controller, template and viewmodel will be bundled and minified into the bundle file, and all but the bundle will be
deleted from your build folder. Again, this reduces HTTP requests.

Note that the bundle file is a JavaScript file, not TypeScript. This is because TypeScript's import does not allow
text! imports without some ugly hacks.

#### Nesting of components on the file-system

Another change I've implemented is nesting of components on the file-system. You can now create
foo-component/bar-component and bar-component will be stored in the foo-component folder. This is useful for organizing
components, when for example your component uses multiple other components that have different logic and you would like
to separate this logic.

### Added

- [Component bundling](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1325103) (Stuart)
- [Components in sub-directories](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1328793) (Stuart)
- [Documentation for creating components](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1324613) (Stuart)


## [2.1.0] - 2014-11-26

### Release notes

Things are moving fast! I just did a merge to master that involves some changes and improvements to 'bootstrapping' the application. A lot of (configuration) code has moved to other/new files.
So below is a list of changes you should know about!

#### Bootstrapping

- The starting point of the application is now **Bootstrap.ts** instead of **Main.ts**, where all the library loading
  and config stuff is located. The Main.ts is cleaner now.
  The contents of **require.config.js** is also moved to Bootstrap.ts.
  
- When doing a **grunt** build, require.js and text.js are also merged into the single output build file, so the initial
  load will only **load 1 javascript file** (Bootstrap.ts) instead of the previous 3-4 files.
  
- All **Knockout** related loading and configuration is now done in app/config/knockout, cleaning up the old
  require.config.js, Externals.ts and StartUp.ts
  
- Bootstrap.ts loads a lib/polyfills/polyfills.js where all polyfills can be placed (such as the console.log polyfill).
  In the future this file will also load all IE8/9/+ polyfills for strings, arrays, etc. so MooTools can be removed.
  
- **Route** configuration is now moved from the Main.ts to a dedicated app/config/Route.ts file.

#### Locale Providers

Lars continued the work from PetervdN and added JSONP and XMLP LocaleProviders and correspondig grunt tasks, so you can load your crossdomain translation files.

The whole /temple/locale/ module has also been changed to Single Exports, and the LocaleManager is now a proper singleton (instead of lm.instance).

#### GaiaRouter Querystring

A new config option has been added to the GaiaRoute. This option removes the ?queryString by default for route-matching, but it can be enabled.

This solves the situation where people have issues with their site being redirected from a deeplink to the Home once a ?querystring was included in the url.


#### JS Sourcemaps

Output Javascript sourcemaps can be enabled in a grunt build in the uglify.js grunt config, so you can view your minified
javascript (that gets generated in a build) as normal javascript in your browser. The task generates an `inc/sourcemap`
folder which you can upload or map-local in Charles. This will allow easier debugging on production.

#### Grunt

The Grunt structure of tasks and aliasses has been refactored because it was getting out of hand! Now each task-config
resides in its own file (in the 'grunt' folder), and aliasses can be changed in grunt/aliasses.yml.

### Added

- [#138: Utility for converting values within ranges](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1254943) (PieterS)
- [#145 added locale aliases](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1258133) (Stuart)
- [Adds PhoneGap grunt tasks](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1237063) (PeterG)
- [#147 Added SCSS ease function for use with CSS transition property.](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1280963) (Jesse)
- [Add loadJSON tasks](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1268843) (Narie)


### Changed
- [Refactored bootstrapping and loading of files](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1268643) (Narie)
- [Created different files for all the locale providers](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1270523) (Lars)
- [added even more YUI docs!](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1272063) (Mient-jan)
- [#93 - Refactor Grunt setup and workflow](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1194603) (Narie)
- [Refactor the use of the queryString in the Router](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1268873) (Narie)
- [Add JS sourcemaps for sentry](https://mediamonks.assembla.com/code/mediamonks-front-end-tools/git-2/merge_requests/1268443) (Narie)

