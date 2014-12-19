# grunt-resource-json [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

>A grunt task for converting java resource bundles to json.

## Getting Started

This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create
a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-resource-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resource-json');
```

## Resource_json task
_Run this task with the `grunt resource_json` command._

Task targets, files and options may be specified according to the Grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### key_mapper
Type: `Function`
Default: `null`

Specified function will be invoked to provide additional key to group properties from a single file.
Null value means that no additional key will be provided.

### Usage Examples

#### Simple conversion

In this example, running `grunt resource_json`  will convert the two specified source files (in order) to json, merge them and write the output to `dist/built.json`.

```js
// Project configuration.
grunt.initConfig({
  resource_json: {
    dist: {
      src: ["test/fixtures/multiple_files_no_key_mapper/1", "test/fixtures/multiple_files_no_key_mapper/2"],
      dest: 'dist/build.json'
    },
  }
});
```

#### Key mapper function

In this example, running `grunt resource_json`  will convert the two specified source files (in order) to jsons with addtional key, merge them and write the output to `dist/built.json`.

```js
// Project configuration.
var path = require('path');

grunt.initConfig({
  resource_json: {
    dist: {
      options: {
          key_mapper: path.basename
      },
      src: ["test/fixtures/multiple_files_no_key_mapper/1", "test/fixtures/multiple_files_no_key_mapper/2"],
      dest: 'dist/build.json'
    }
  },
});
```

## Release History

 * 2014-12-19   v0.1.2   Added support for unicode.
 * 2014-12-01   v0.1.1   Fixed removing first character of every translated text.
 * 2014-11-29   v0.1.0   First version.
