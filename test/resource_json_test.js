'use strict';

var grunt = require('grunt');
var path = require('path');

var tests = [
    {filename: "single_file_no_key_mapper", text: "should translate single file to json"},
    {filename: "multiple_files_no_key_mapper", text: "should translate multiple files to a single json"},
    {filename: "single_file_key_mapper", text: "should translate single file to json with key given by key mapper"},
    {filename: "multiple_files_key_mapper", text: "should translate multiple files with the use of key mapper and merge them to a single file"},
    {filename: "filter_out_invalid_lines", text: "should filter out invalid lines e.g. comments"},
    {filename: "unicode_support", text: "should translate exactly unicode literals"}
];

function createTest(filename, text) {
    var expectedDir = "test/expected";
    var tmpDir = "tmp";

    function getNormalizedFile(filepath) {
        return grunt.util.normalizelf(grunt.file.read(filepath));
    }

    function assertEqual(expected, actual, msg, test) {
        test.deepEqual(JSON.parse(actual), JSON.parse(expected), msg)
    }

    return function(test) {
        test.expect(1);

        var actual = getNormalizedFile(path.join(tmpDir, filename));
        var expected = getNormalizedFile(path.join(expectedDir, filename));
        assertEqual(actual, expected, text, test);

        test.done();
    }
}



exports.resource_json = {};

(function() {
    var i, test;
    for(i = 0; i < tests.length; i++) {
        test = tests[i];
        exports.resource_json[test.filename] = createTest(test.filename, test.text);
    }
})();