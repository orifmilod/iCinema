'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  addonType: _propTypes2.default.oneOf(['prepend', 'append']).isRequired,
  children: _propTypes2.default.node
};

var InputGroupButtonDropdown = function InputGroupButtonDropdown(props) {
  return _react2.default.createElement(_Dropdown2.default, props);
};

InputGroupButtonDropdown.propTypes = propTypes;

exports.default = InputGroupButtonDropdown;