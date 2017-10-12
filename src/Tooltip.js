// @flow

import React, { Component } from 'react';
import type { ElementProps, ComponentType } from 'react';

export type LabelProps = {
    labelAttributes: {
        role: 'tooltip',
        tabIndex: '0',
        'aria-describedby': string,
        onFocus: () => {},
    },
    isHidden: boolean,
    requestHide: () => {},
    requestShow: () => {},
    requestToggle: () => {},
};

export type OverlayProps = {
    overlayAttributes: {
        tabIndex: '-1',
        'aria-describedby': string,
        onFocus: () => {},
    },
    isHidden: boolean,
    requestHide: () => {},
    requestShow: () => {},
    requestToggle: () => {},
};

export type TooltipState = {
    isHidden: boolean,
};

export type TooltipProps = ElementProps<'div'> & {
    label: ComponentType<LabelProps>,
    overlay: ComponentType<OverlayProps>,
};

let counter = 0;

class Tooltip extends Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
        super(props);
        this.identifier = `react-accessible-tooltip-${counter}`;
        counter += 1;
    }

    state = {
        isHidden: true,
    };

    onBlur({ relatedTarget, currentTarget }: SyntheticFocusEvent<HTMLElement>) {
        // The idea of this logic is that we should only close the tooltip if focus has shifted from the tooltip AND all of its descendents.
        if (!(relatedTarget && relatedTarget instanceof HTMLElement)) {
            this.hide();
        } else if (!currentTarget.contains(relatedTarget)) {
            this.hide();
        }
    }

    hide() {
        this.setState({ isHidden: true });
    }

    show() {
        this.setState({ isHidden: false });
    }

    toggle() {
        this.setState({ isHidden: !this.state.isHidden });
    }

    identifier: string;

    render() {
        const { label: Label, overlay: Overlay, ...rest } = this.props;

        const { isHidden } = this.state;

        return (
            <div {...rest} onBlur={e => this.onBlur(e)}>
                <Label
                    labelAttributes={{
                        role: 'tooltip',
                        tabIndex: '0',
                        'aria-describedby': `#${this.identifier}`,
                        onFocus: () => this.show(),
                    }}
                    isHidden={isHidden}
                    requestHide={() => this.hide()}
                    requestShow={() => this.show()}
                    requestToggle={() => this.toggle()}
                />
                <Overlay
                    overlayAttributes={{
                        tabIndex: '-1',
                        id: this.identifier,
                        'aria-hidden': this.state.isHidden,
                    }}
                    isHidden={isHidden}
                    requestHide={() => this.hide()}
                    requestShow={() => this.show()}
                    requestToggle={() => this.toggle()}
                />
            </div>
        );
    }
}

export default Tooltip;
