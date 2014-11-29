'use strict';

var grunt = require('grunt');

function getNormalizedFile(filepath) {
    return grunt.util.normalizelf(grunt.file.read(filepath));
}

function assertEqual(expected, actual, msg, test) {
    test.deepEqual(JSON.parse(actual), JSON.parse(expected), msg)
}

exports.resource_json = {
    single_file_no_key_mapper: function(test) {
        test.expect(1);

        var actual = getNormalizedFile('tmp/single_file_no_key_mapper');
        var expected = getNormalizedFile('test/expected/single_file_no_key_mapper');
        assertEqual(actual, expected, 'should translate single file to json', test);

        test.done();
    },
    multiple_files_no_key_mapper: function(test) {
        test.expect(1);

        var actual = getNormalizedFile('tmp/multiple_files_no_key_mapper');
        var expected = getNormalizedFile('test/expected/multiple_files_no_key_mapper');
        assertEqual(actual, expected, 'should translate multiple files to a single json', test);

        test.done();
    },
    single_file_key_mapper: function(test) {
        test.expect(1);

        var actual = getNormalizedFile('tmp/single_file_key_mapper');
        var expected = getNormalizedFile('test/expected/single_file_key_mapper');
        assertEqual(actual, expected, 'should translate single file to json with key given by key mapper', test);

        test.done();
    },
    multiple_files_key_mapper: function(test) {
        test.expect(1);

        var actual = getNormalizedFile('tmp/multiple_files_key_mapper');
        var expected = getNormalizedFile('test/expected/multiple_files_key_mapper');
        assertEqual(actual, expected, 'should translate multiple files with the use of key mapper and merge them to a single file', test);

        test.done();
    },
    filter_out_invalid_lines: function(test) {
        test.expect(1);

        var actual = getNormalizedFile('tmp/filter_out_invalid_lines');
        var expected = getNormalizedFile('test/expected/filter_out_invalid_lines');
        assertEqual(actual, expected, 'should filter out invalid lines e.g. comments', test);

        test.done();
    }
};