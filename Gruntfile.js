/*global module:false*/


module.exports = function (grunt) {
    var path = require('path');

    grunt.initConfig({
        resource_json: {
            single_file_no_key_mapper: {
                src: "test/fixtures/single_file_no_key_mapper",
                dest: 'tmp/single_file_no_key_mapper',
                nonull: true
            },
            multiple_files_no_key_mapper: {
                src: "test/fixtures/multiple_files_no_key_mapper/*",
                dest: 'tmp/multiple_files_no_key_mapper',
                nonull: true
            },
            single_file_key_mapper: {
                options: {
                    key_mapper: function(filepath) {
                        var filename = path.basename(filepath);
                        var localeIndex = filename.indexOf("_") + 1;

                        return filename.substring(localeIndex);
                    }
                },
                src: "test/fixtures/single_file_key_mapper",
                dest: 'tmp/single_file_key_mapper',
                nonull: true
            },
            multiple_files_key_mapper: {
                options: {
                    key_mapper: function(filepath) {
                       var filename = path.basename(filepath);
                       var localeIndex = filename.indexOf("_") + 1;

                       return filename.substring(localeIndex);
                    }
                },
                src: "test/fixtures/multiple_files_key_mapper/*",
                dest: 'tmp/multiple_files_key_mapper',
                nonull: true
            },
            filter_out_invalid_lines: {
                src: "test/fixtures/filter_out_invalid_lines",
                dest: 'tmp/filter_out_invalid_lines',
                nonull: true
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        },
        clean: {
            tests: ['tmp']
        }


    });



    // These plugins provide necessary tasks.
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-debug-task');


    // Default task.
    grunt.registerTask('test', ['clean', 'resource_json', 'nodeunit']);
    grunt.registerTask('default', ['test']);

};
