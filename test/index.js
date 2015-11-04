'use strict';

var test = require('tape');
var request = require('request');
var requestGlobalDefaults = require('../');

test('defaulting/overriding a custom querystring', function (t) {
  t.plan(2);

  var defaultOptions = {
    json: true, // so we don't have to JSON.parse(body) later
    qs: {
      'request-globaldefaults': 'default value',
    },
  };

  var overrideOptions = {
    url: 'https://httpbin.org/get',
    qs: {
      'request-globaldefaults': 'override value',
    },
  };

  requestGlobalDefaults(defaultOptions, request);

  request('https://httpbin.org/get', function (error, response, body) {
    if (error) {
      t.fail(error);
    }
    else {
      t.equal(body.args['request-globaldefaults'], 'default value');
    }
  });

  request(overrideOptions, function (error, response, body) {
    if (error) {
      t.fail(error);
    }
    else {
      t.equal(body.args['request-globaldefaults'], 'override value');
    }
  });
});
