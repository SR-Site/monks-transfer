# Unit tests
This document describes how to run the unit tests provided by Skeleton. The test runner we use is
[Karma 0.13](http://karma-runner.github.io/0.13/index.html) and our testing framework is
[Jasmine](http://jasmine.github.io/).

## NPM
1. Open a console and cd to `[project directory]/tools/build`
2. run `npm run test-karma`

## Grunt
1. Open a console window, cd to `[project directory]/tools/build`
2. run `grunt karma:watch`

Karma will now re-run all unit tests when you modify a file in the `inc/script` folder. If you want to run the tests
once, run `grunt karma:unit`

## WebStorm
WebStorm provides an excellent interface for running unit tests with a tree structure, jump-to-source and much more. To
configure WebStorm for unit testing your project, run the following steps:

1. In your menu bar, open `Run` and click `Edit Configurations...`
2. Click the + button and select `Karma`
3. Enter the following settings:
	* Name: Karma
	* Configuration file: `[project directory]/tools/test/karma.conf.js`
	* Node interpreter: path to your node binary (e.g. `C:\Program Files\nodejs\node.exe`)
	* Karma Package: `[project directory]/tools/build/node_modules/karma`
	* Click OK
4. A play button should now appear in the top right corner of your editor, when you click it a panel at the bottom will
open and while Karma is running, unit tests will refresh as you write code
	* It is also possible to run Karma from the Run menu we opened in step #1

For more information on unit tests in WebStorm, see the
[official guide](https://www.jetbrains.com/webstorm/help/unit-testing-javascript.html).