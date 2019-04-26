'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  type: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.node,
  inline: _propTypes2.default.bool,
  valid: _propTypes2.default.bool,
  invalid: _propTypes2.default.bool,
  bsSize: _propTypes2.default.string,
  cssModule: _propTypes2.default.object,
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array, _propTypes2.default.func]),
  innerRef: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.func])
};

function CustomInput(props) {
  var className = props.className,
      label = props.label,
      inline = props.inline,
      valid = props.valid,
      invalid = props.invalid,
      cssModule = props.cssModule,
      children = props.children,
      bsSize = props.bsSize,
      innerRef = props.innerRef,
      attributes = _objectWithoutProperties(props, ['className', 'label', 'inline', 'valid', 'invalid', 'cssModule', 'children', 'bsSize', 'innerRef']);

  var type = attributes.type;

  var customClass = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'custom-' + type, bsSize ? 'custom-' + type + '-' + bsSize : false), cssModule);

  var validationClassNames = (0, _utils.mapToCssModules)((0, _classnames2.default)(invalid && 'is-invalid', valid && 'is-valid'), cssModule);

  if (type === 'select') {
    return _react2.default.createElement(
      'select',
      _extends({}, attributes, { ref: innerRef, className: (0, _classnames2.default)(validationClassNames, customClass) }),
      children
    );
  }

  if (type === 'file') {
    return _react2.default.createElement(
      'div',
      { className: customClass },
      _react2.default.createElement('input', _extends({}, attributes, { ref: innerRef, className: (0, _classnames2.default)(validationClassNames, (0, _utils.mapToCssModules)('custom-file-input', cssModule)) })),
      _react2.default.createElement(
        'label',
        { className: (0, _utils.mapToCssModules)('custom-file-label', cssModule), htmlFor: attributes.id },
        label || 'Choose file'
      )
    );
  }

  if (type !== 'checkbox' && type !== 'radio') {
    return _react2.default.createElement('input', _extends({}, attributes, { ref: innerRef, className: (0, _classnames2.default)(validationClassNames, customClass) }));
  }

  var wrapperClasses = (0, _classnames2.default)(customClass, (0, _utils.mapToCssModules)((0, _classnames2.default)('custom-control', { 'custom-control-inline': inline }), cssModule));

  return _react2.default.createElement(
    'div',
    { className: wrapperClasses },
    _react2.default.createElement('input', _extends({}, attributes, {
      ref: innerRef,
      className: (0, _classnames2.default)(validationClassNames, (0, _utils.mapToCssModules)('custom-control-input', cssModule))
    })),
    _react2.default.createElement(
      'label',
      { className: (0, _utils.mapToCssModules)('custom-control-label', cssModule), htmlFor: attributes.id },
      label
    ),
    children
  );
}

CustomInput.propTypes = propTypes;

exports.default = CustomInput;