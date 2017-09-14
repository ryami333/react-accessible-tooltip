import React, { Component } from 'react';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//      

var counter = 0;

var Tooltip = function (_Component) {
    _inherits(Tooltip, _Component);

    function Tooltip(props) {
        _classCallCheck(this, Tooltip);

        var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

        _this.state = {
            isHidden: true
        };

        _this.identifier = 'react-accessible-tooltip-' + counter;
        counter += 1;
        return _this;
    }

    _createClass(Tooltip, [{
        key: 'onBlur',
        value: function onBlur(_ref) {
            var relatedTarget = _ref.relatedTarget,
                currentTarget = _ref.currentTarget;

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

            return React.createElement(
                'div',
                _extends({}, rest, {
                    onBlur: function onBlur(e) {
                        return _this2.onBlur(e);
                    },
                    ref: function ref(node) {
                        _this2.node = node;
                    }
                }),
                React.createElement(Label, _extends({}, this.state, {
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
                React.createElement(Overlay, _extends({}, this.state, {
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
}(Component);

//      

// eslint-disable-next-line import/prefer-default-export

export { Tooltip };
