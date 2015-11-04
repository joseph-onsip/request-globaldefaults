'use strict';

var extend = require('extend');

module.exports = globalDefaults;

function globalDefaults (defaults, request) {
  var init = request.Request.prototype.init;
  request.Request.prototype.init = function (options) {
    var defaultedOptions = extend(true, Object.create(null), defaults, options)
    return init.call(this, defaultedOptions);
  };
}
