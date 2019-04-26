'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _InputGroupAddon = require('./InputGroupAddon');

var _InputGroupAddon2 = _interopRequireDefault(_InputGroupAddon);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  addonType: _propTypes2.default.oneOf(['prepend', 'append']).isRequired,
  children: _propTypes2.default.node,
  groupClassName: _propTypes2.default.string,
  groupAttributes: _propTypes2.default.object,
  className: _propTypes2.default.string,
  cssModule: _propTypes2.default.object
};

var InputGroupButton = function InputGroupButton(props) {
  (0, _utils.warnOnce)('The "InputGroupButton" component has been deprecated.\nPlease use component "InputGroupAddon".');

  var children = props.children,
      groupClassName = props.groupClassName,
      groupAttributes = props.groupAttributes,
      propsWithoutGroup = _objectWithoutProperties(props, ['children', 'groupClassName', 'groupAttributes']);

  if (typeof children === 'string') {
    var cssModule = propsWithoutGroup.cssModule,
        tag = propsWithoutGroup.tag,
        addonType = propsWithoutGroup.addonType,
        attributes = _objectWithoutProperties(propsWithoutGroup, ['cssModule', 'tag', 'addonType']);

    var allGroupAttributes = _extends({}, groupAttributes, {
      cssModule: cssModule,
      tag: tag,
      addonType: addonType
    });

    return _react2.default.createElement(
      _InputGroupAddon2.default,
      _extends({}, allGroupAttributes, { className: groupClassName }),
      _react2.default.createElement(_Button2.default, _extends({}, attributes, { children: children }))
    );
  }

  return _react2.default.createElement(_InputGroupAddon2.default, _extends({}, props, { children: children }));
};

InputGroupButton.propTypes = propTypes;

exports.default = InputGroupButton;