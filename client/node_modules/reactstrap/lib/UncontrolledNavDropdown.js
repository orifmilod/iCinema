'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _UncontrolledDropdown = require('./UncontrolledDropdown');

var _UncontrolledDropdown2 = _interopRequireDefault(_UncontrolledDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UncontrolledNavDropdown = function UncontrolledNavDropdown(props) {
  (0, _utils.warnOnce)('The "UncontrolledNavDropdown" component has been deprecated.\nPlease use component "UncontrolledDropdown" with nav prop.');

  return _react2.default.createElement(_UncontrolledDropdown2.default, _extends({ nav: true }, props));
};

exports.default = UncontrolledNavDropdown;