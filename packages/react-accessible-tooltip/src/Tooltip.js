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
};

export type OverlayProps = {
    overlayAttributes: {
        tabIndex: '-1',
        id: string,
        'aria-hidden': boolean,
    },
    isHidden: boolean,
};

export type TooltipState = {
    isFocussed: boolean,
    isHovered: boolean,
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
        isHovered: false,
    };

    componentDidMount() {
        document.addEventListener('touchstart', this.handleTouch);
    }

    componentWillUnmount() {
        document.removeEventListener('touchstart', this.handleTouch);
    }

    onFocus = () => {
        this.setState({ isFocussed: true });
    };

    onBlur = ({
        relatedTarget,
        currentTarget,
    }: SyntheticFocusEvent<HTMLElement>) => {
        // relatedTarget is better for React testability etc, but activeElement works as an IE11 fallback:
        const newTarget = relatedTarget || document.activeElement;

        // The idea of this logic is that we should only close the tooltip if focus has shifted from the tooltip AND all of its descendents.
        if (!(newTarget && newTarget instanceof HTMLElement)) {
            this.setState({ isFocussed: false });
        } else if (!currentTarget.contains(newTarget)) {
            this.setState({ isFocussed: false });
        }
    };

    onMouseEnter = () => {
        this.setState({ isHovered: true });
    };

    onMouseLeave = () => {
        this.setState({ isHovered: false });
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
            this.setState({ isFocussed: false });
            activeElement.blur();
        }
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

        const { isFocussed, isHovered } = this.state;
        const isHidden = !(isFocussed || isHovered);

        const labelProps: LabelProps = {
            labelAttributes: {
                role: 'tooltip',
                tabIndex: '0',
                'aria-describedby': this.identifier,
                onFocus: this.onFocus,
            },
            isHidden,
        };

        const overlayProps: OverlayProps = {
            overlayAttributes: {
                tabIndex: '-1',
                id: this.identifier,
                'aria-hidden': isHidden,
            },
            isHidden,
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
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <Label {...labelProps} />
                <Overlay {...overlayProps} />
            </div>
        );
    }
}

export default Tooltip;
