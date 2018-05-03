// @flow

import React, { Component } from 'react';
import type { ElementProps, ComponentType } from 'react';

export type LabelProps = {
    labelAttributes: {
        role: 'tooltip',
        tabIndex: '0',
        'aria-describedby': string,
        onFocus: () => void,
    },
    isHidden: boolean,
    requestHide: () => void,
    requestShow: () => void,
    requestToggle: () => void,
};

export type OverlayProps = {
    overlayAttributes: {
        tabIndex: '-1',
        id: string,
        'aria-hidden': boolean,
    },
    isHidden: boolean,
    requestHide: () => void,
    requestShow: () => void,
    requestToggle: () => void,
};

export type TooltipState = {
    isFocussed: boolean,
};

export type TooltipProps = ElementProps<'div'> & {
    label: ComponentType<LabelProps>,
    overlay: ComponentType<OverlayProps>,
    containerRef?: HTMLDivElement => void,
};

let counter = 0;

class Tooltip extends Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
        super(props);
        this.identifier = `react-accessible-tooltip-${counter}`;
        counter += 1;
    }

    state = {
        isFocussed: false,
    };

    componentDidMount() {
        document.addEventListener('touchstart', this.handleTouch);
    }

    componentWillUnmount() {
        document.removeEventListener('touchstart', this.handleTouch);
    }

    onBlur = ({
        relatedTarget,
        currentTarget,
    }: SyntheticFocusEvent<HTMLElement>) => {
        // relatedTarget is better for React testability etc, but activeElement works as an IE11 fallback:
        const newTarget = relatedTarget || document.activeElement;

        // The idea of this logic is that we should only close the tooltip if focus has shifted from the tooltip AND all of its descendents.
        if (!(newTarget && newTarget instanceof HTMLElement)) {
            this.hide();
        } else if (!currentTarget.contains(newTarget)) {
            this.hide();
        }
    };

    // This handles the support for touch devices that do not trigger blur on 'touch-away'.
    handleTouch = ({ target }: Event) => {
        const { activeElement } = document;

        if (
            activeElement instanceof Element &&
            target instanceof Element &&
            this.container instanceof Element &&
            !this.container.contains(target) && // touch target not a tooltip descendent
            this.state.isFocused // prevent redundant state change
        ) {
            this.hide();
            activeElement.blur();
        }
    };

    hide = () => {
        this.setState({ isFocussed: false });
    };

    show = () => {
        this.setState({ isFocussed: true });
    };

    toggle = () => {
        this.setState({ isFocussed: !this.state.isFocussed });
    };

    container: ?HTMLDivElement;
    identifier: string;

    render() {
        const {
            label: Label,
            overlay: Overlay,
            containerRef,
            ...rest
        } = this.props;

        const { isFocussed } = this.state;
        const isHidden = isFocussed;

        const labelProps: LabelProps = {
            labelAttributes: {
                role: 'tooltip',
                tabIndex: '0',
                'aria-describedby': this.identifier,
                onFocus: this.show,
            },
            isHidden,
            requestHide: this.hide,
            requestShow: this.show,
            requestToggle: this.toggle,
        };

        const overlayProps: OverlayProps = {
            overlayAttributes: {
                tabIndex: '-1',
                id: this.identifier,
                'aria-hidden': isHidden,
            },
            isHidden,
            requestHide: this.hide,
            requestShow: this.show,
            requestToggle: this.toggle,
        };

        return (
            <div
                {...rest}
                onBlur={this.onBlur}
                ref={ref => {
                    this.container = ref;
                    if (containerRef) {
                        containerRef(ref);
                    }
                }}
            >
                <Label {...labelProps} />
                <Overlay {...overlayProps} />
            </div>
        );
    }
}

export default Tooltip;
