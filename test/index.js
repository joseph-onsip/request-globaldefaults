'use strict';

var test = require('tape');
var nets = require('nets');
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

  // The path used here should be `nets` result for require.resolve('request')
  // This path can change based on your dependencies and npm version.
  var innerRequest = require('nets/node_modules/request');
  requestGlobalDefaults(defaultOptions, innerRequest);

  nets('https://httpbin.org/get', function (error, response, body) {
    if (error) {
      t.fail(error);
    }
    else {
      t.equal(body.args['request-globaldefaults'], 'default value');
    }
  });

  nets(overrideOptions, function (error, response, body) {
    if (error) {
      t.fail(error);
    }
    else {
      t.equal(body.args['request-globaldefaults'], 'override value');
    }
  });
});
