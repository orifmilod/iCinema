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

var CarouselCaption = function CarouselCaption(props) {
  var captionHeader = props.captionHeader,
      captionText = props.captionText,
      cssModule = props.cssModule,
      className = props.className;

  var classes = (0, _utils.mapToCssModules)((0, _classnames2.default)(className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);

  return _react2.default.createElement(
    'div',
    { className: classes },
    _react2.default.createElement(
      'h3',
      null,
      captionHeader
    ),
    _react2.default.createElement(
      'p',
      null,
      captionText
    )
  );
};

CarouselCaption.propTypes = {
  captionHeader: _propTypes2.default.string,
  captionText: _propTypes2.default.string.isRequired,
  cssModule: _propTypes2.default.object,
  className: _propTypes2.default.string
};

exports.default = CarouselCaption;