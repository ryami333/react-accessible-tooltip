'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/*!
 * consecutive
 * Get consecutive numbers
 * Copyright(c) 2017 ivanoff .$ curl -A cv ivanoff.org.ua
 * MIT Licensed
 */
var consecutive = function (begin, base, inc) {
  var number = begin || 0;
  if (typeof base !== 'number') base = 10;
  if (typeof inc !== 'number') inc = 1;

  return function () {
    var res;
    if (typeof base === 'undefined' || base === 10) {
      res = number;
      number += inc;
    } else {
      res = number.toString();
      number = (parseInt(number, base) + inc).toString(base);
    }

    return res;
  };
};

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//      

var next = consecutive();

var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tooltip);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isHidden: true
        }, _this.identifier = 'react-accessible-tooltip-' + next(), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tooltip, [{
        key: 'onBlur',
        value: function onBlur(_ref2) {
            var relatedTarget = _ref2.relatedTarget,
                currentTarget = _ref2.currentTarget;

            // The idea of this logic is that we should only close the tooltip if focus has shifted from the tooltip AND all of its descendents.
            if (!(relatedTarget && relatedTarget instanceof HTMLElement)) {
                this.hide();
            } else if (!currentTarget.contains(relatedTarget)) {
                this.hide();
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ isHidden: true });
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ isHidden: false });
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.setState({ isHidden: !this.state.isHidden });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                Label = _props.label,
                Overlay = _props.overlay,
                rest = _objectWithoutProperties(_props, ['label', 'overlay']);

            return React__default.createElement(
                'div',
                _extends({}, rest, {
                    onBlur: function onBlur(e) {
                        return _this2.onBlur(e);
                    },
                    ref: function ref(node) {
                        _this2.node = node;
                    }
                }),
                React__default.createElement(Label, _extends({}, this.state, {
                    labelAttributes: {
                        role: 'tooltip',
                        tabIndex: '0',
                        'aria-describedby': '#' + this.identifier,
                        onFocus: function onFocus() {
                            return _this2.show();
                        }
                    },
                    requestHide: function requestHide() {
                        return _this2.hide();
                    },
                    requestShow: function requestShow() {
                        return _this2.show();
                    },
                    requestToggle: function requestToggle() {
                        return _this2.toggle();
                    }
                })),
                React__default.createElement(Overlay, _extends({}, this.state, {
                    overlayAttributes: {
                        tabIndex: '-1',
                        id: this.identifier,
                        'aria-hidden': this.state.isHidden
                    },
                    requestHide: function requestHide() {
                        return _this2.hide();
                    },
                    requestShow: function requestShow() {
                        return _this2.show();
                    },
                    requestToggle: function requestToggle() {
                        return _this2.toggle();
                    }
                }))
            );
        }
    }]);

    return Tooltip;
}(React.Component);

//      

// eslint-disable-next-line import/prefer-default-export

exports.Tooltip = Tooltip;
