'use strict';

var _enzyme = require('enzyme');

var _enzyme2 = _interopRequireDefault(_enzyme);

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global jest */
/* eslint-disable import/no-extraneous-dependencies */
_enzyme2.default.configure({ adapter: new _enzymeAdapterReact2.default() });

// TODO remove when enzyme releases https://github.com/airbnb/enzyme/pull/1179
_enzyme.ReactWrapper.prototype.hostNodes = function () {
  return this.filterWhere(function (n) {
    return typeof n.type() === 'string';
  });
};
global.requestAnimationFrame = function (cb) {
  cb(0);
};
global.window.cancelAnimationFrame = function () {};
global.createSpyObj = function (baseName, methodNames) {
  var obj = {};

  for (var i = 0; i < methodNames.length; i += 1) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};
global.document.createRange = function () {
  return {
    setStart: function setStart() {},
    setEnd: function setEnd() {},
    commonAncestorContainer: {}
  };
};