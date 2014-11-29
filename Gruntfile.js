/*global module:false*/


module.exports = function (grunt) {
    grunt.loadTasks('tasks');
    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        resource_json: {
            test: {
                options: {
                    key_mapper: null
//                        function(filepath) {
//                       var lastSlashIndex = filepath.indexOf("/");
//                       var startSearchIndex = 0;
//                       var filename, locale, localeIndex;
//                       if(lastSlashIndex === -1) {
//                           startSearchIndex = 0;
//                       } else {
//                           startSearchIndex = lastSlashIndex + 1;
//                       }
//
//                       filename = filepath.substring(lastSlashIndex);
//                       localeIndex = filename.indexOf("_") + 1;
//
//                       return filename.substring(localeIndex);
//                    }
                },
                files: [
                    {
                        src: ['package.json', 'npm-debug.log', 'test'],
                        dest: 'dest/',
                        nonull: true
                    }
                ]
            }
        }

    });

    // These plugins provide necessary tasks.


    // Default task.
    grunt.registerTask('default', ['resource_json:test']);

};
