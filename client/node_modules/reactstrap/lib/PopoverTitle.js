'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PopoverTitle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PopoverHeader = require('./PopoverHeader');

var _PopoverHeader2 = _interopRequireDefault(_PopoverHeader);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PopoverTitle(props) {
  (0, _utils.warnOnce)('The "PopoverTitle" component has been deprecated.\nPlease use component "PopoverHeader".');
  return _react2.default.createElement(_PopoverHeader2.default, props);
}