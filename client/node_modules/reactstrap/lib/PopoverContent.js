'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PopoverContent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PopoverBody = require('./PopoverBody');

var _PopoverBody2 = _interopRequireDefault(_PopoverBody);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PopoverContent(props) {
  (0, _utils.warnOnce)('The "PopoverContent" component has been deprecated.\nPlease use component "PopoverBody".');
  return _react2.default.createElement(_PopoverBody2.default, props);
}