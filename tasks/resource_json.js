'use strict';

module.exports = function (grunt) {
    grunt.registerMultiTask('resource_json', 'Converts java resouce bundle to json', function () {
        var options = this.options({
            key_mapper: null
        });

        this.files.forEach(function (file) {
            var mergedJson = {};

            function keyValueJsonToFileOutputJson(filepath, valueObj) {
                var result = {};
                if (options.key_mapper) {
                    result[options.key_mapper(filepath)] = valueObj;
                } else {
                    result = valueObj;
                }

                return result;
            }

            var jsonsToMerge = file.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found');
                    return false;
                }
                return true;
            }).map(function (filepath) {
                grunt.log.writeln('Reading "' + filepath + '"');
                var content = grunt.file.read(filepath);
                var regex = /^[\w.]+\s*=\s*.+$/igm;
                var matches = content.match(regex);
                var match = null;
                var keyValueSepIndex = null;
                var valueObj = {};

                if (matches) {
                    for (var i = 0; i < matches.length; i++) {
                        match = matches[i];
                        keyValueSepIndex = match.indexOf("=");
                        valueObj[match.substr(0, keyValueSepIndex - 1).trim()] = match.substr(keyValueSepIndex + 1).trim()
                    }
                } else {
                    grunt.log.warn('No key found in file "' + filepath + '"')
                }

                return keyValueJsonToFileOutputJson(filepath, valueObj);
            });

            for (var i = 0; i < jsonsToMerge.length; i++) {
                for (var propName in jsonsToMerge[i]) {
                    if (propName in mergedJson) {
                        grunt.log.warn('Duplicated resource entry for key "' + propName + '", skipping it')
                    } else {
                        mergedJson[propName] = jsonsToMerge[i][propName];
                    }
                }
            }

            grunt.file.write(file.dest, JSON.stringify(mergedJson, null, 4));
            grunt.log.writeln('File "' + file.dest + '" created');
        });
    });
}