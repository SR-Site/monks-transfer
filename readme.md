# MediaMonks Frontend Skeleton

The Frontend Skeleton contains all you need to start a new project; boilerplate code, the Gaia framework and used
libraries, and the scaffold and build tools to get the project up and running and distributed.

## Workspace setup

### Node.js

- Install Node.js from <https://nodejs.org/download/>
- (windows) make sure `C:\Users\%USERNAME%\AppData\Roaming\npm` is in your **PATH**
- (windows) install python 2.7 and Visual Studio Express (for vcbuild/msbuild) so you can build node modules with
  node-gyp when running `npm install`.
- install the following modules globally with NPM (on OSX you might need to use 'sudo')
    - run `npm install -g grunt-cli` to install the grunt cli, so you can scaffold and build your project
    - run `npm install -g typescript` to install typescript to compile your code from your IDE
    - run `npm install -g node-sass` to install sass to compile your code form your IDE
- (php) install composer from <https://getcomposer.org/download/>

### WebStorm

You can use any editor that has support for TypeScript and Sass, and you can compile your code from an IDE plugin or via
external tools that watch your code changes.

We recommend using WebStorm for the File Watchers; they compile your code on change and give immediate actionable
feedback, so you can see your errors and fix your code. You can download WebStorm from
<http://www.jetbrains.com/webstorm/download>.

You can add/export/import File Watchers from: `File > Settings... > Tools > File Watchers`

#### TypeScript File Watcher

- Add "TypeScript"
- turn off "immediate file synchronization"
- **Program**
    - (windows) `C:\Users\%USERNAME%\AppData\Roaming\npm\tsc.cmd` (substitute with your own username)
    - (osx) `/opt/local/bin/tsc`
- **Arguments** $FilePath$ --module AMD

#### TypeScript Compiler

You can also switch to the new build in TypeScript Compiler in favor of the File Watcher:
`File > Settings... > Languages & Frameworks > TypeScript`

- **Command line options** `--module AMD`

#### Sass File Watcher

- Add "SCSS"
- turn off "immediate file synchronization"
- turn on "Track only root files"
- **Program**
    - (windows) `C:\Users\%USERNAME%\AppData\Roaming\npm\node-sass.cmd` (substitute with your own username)
    - (osx) `/opt/local/bin/node-sass`
- **Arguments** `$FileName$ $FileNameWithoutExtension$.css`

#### AutoPrefixer File Watcher

- Add "<custom>"
- turn off "immediate file synchronization"
- turn off "Track only root files"
- **Program**
    - (windows) `C:\Users\%USERNAME%\AppData\Roaming\npm\grunt.cmd` (substitute with your own username)
    - (osx) `/opt/local/bin/grunt`
- **File type** `any`
- **Scope**
    - Create a new scope using the \[...\] button (local, name it screen.css)
    - Add the pattern to point to the screen.css file: `file:deploy/htdocs/inc/style/screen.css` (you can test it using
      the blue filter icon)
- **Arguments** `postcss`
- **Working directory** `$ProjectFileDir$/tools/build` (if you have 'htdocs' as project folder, you need to specify the
  /tools/build directory as a full path without macro's, e.g. '/Users/{username}/Sites/{projectname}/tools/build')


## Project Setup

After cloning the project, you have to do the following to get the project up and running:

- from `/tools/build` run `npm install` to get get all the grunt tools (to scaffold and build the project)
- (php) from `/deploy` (or any other folder with a composer.json) run `composer install`
- set up your compilers for TypeScript, Sass and autoPrefixer (using WebStorm File Watchers / Compiler, or any other
  method like 'grunt watch'), and make sure the settings are the same as in the grunt task settings.
    - **TypeScript**: use module __amd__, target __es3__ and enable __sourcemaps__
    - **Sass**: enable __sourcemaps__
    - **AutoPrefixer**: run via grunt, or match browser settings from grunt autoprefixer config file,
      e.g. `['last 2 versions', 'ie >= 9']`

Creating new pages can be done by adding the page config in `inc/script/app/config/sitemap.ts` and running
`grunt scaffold` from `/tools/build/`.

Creting new components can be done by running `grunt component --name my-component` from `/tools/build/`.

**\<Insert custom project setup instructions here\>**

### Webserver

- **Apache** can be set up locally for development (using Xampp, Mamp Pro, or just Apache). For performance reasons the
  live environment might use **nginx**.
- **PHP** 5.5.x is used
- **MySQL** is used as a database, for local development you can connect to `norbu.mediamonks.local`.

**\<Insert custom project server information. e.g. .NET, NodeJS, Redis, MongoDB, etc\>**

## Build and Deploy

**\<When using the MediaMonks Deploytool, insert the url(s) here and remove the info below\>**

When uploading manually, run `grunt release` from `/tools/build/`, and upload the content from the `/build` folder over
the uploaded (backend) content from `/deploy/htdocs/*`.

**\<When relevant, insert custom client deploy instructions here\>**

### Testing with Charles Map Local

Map Local the `inc` folder on the server to your local `inc` folder to test local changes on the live website.