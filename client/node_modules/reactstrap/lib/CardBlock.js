'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CardBlock;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardBody = require('./CardBody');

var _CardBody2 = _interopRequireDefault(_CardBody);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CardBlock(props) {
  (0, _utils.warnOnce)('The "CardBlock" component has been deprecated.\nPlease use component "CardBody".');
  return _react2.default.createElement(_CardBody2.default, props);
}