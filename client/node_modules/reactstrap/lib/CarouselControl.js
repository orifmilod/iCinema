'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarouselControl = function CarouselControl(props) {
  var direction = props.direction,
      onClickHandler = props.onClickHandler,
      cssModule = props.cssModule,
      directionText = props.directionText,
      className = props.className;


  var anchorClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'carousel-control-' + direction), cssModule);

  var iconClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)('carousel-control-' + direction + '-icon'), cssModule);

  var screenReaderClasses = (0, _utils.mapToCssModules)((0, _classnames2.default)('sr-only'), cssModule);

  return _react2.default.createElement(
    'a',
    {
      className: anchorClasses,
      role: 'button',
      tabIndex: '0',
      onClick: function onClick(e) {
        e.preventDefault();
        onClickHandler();
      }
    },
    _react2.default.createElement('span', { className: iconClasses, 'aria-hidden': 'true' }),
    _react2.default.createElement(
      'span',
      { className: screenReaderClasses },
      directionText || direction
    )
  );
};

CarouselControl.propTypes = {
  direction: _propTypes2.default.oneOf(['prev', 'next']).isRequired,
  onClickHandler: _propTypes2.default.func.isRequired,
  cssModule: _propTypes2.default.object,
  directionText: _propTypes2.default.string,
  className: _propTypes2.default.string
};

exports.default = CarouselControl;