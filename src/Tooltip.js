// @flow

import React, { Component } from 'react';
import type { Node, ElementProps } from 'react';

export type TooltipState = {
    isHidden: boolean,
};

export type LabelProps = ElementProps<'*'> & TooltipState;
export type OverlayProps = ElementProps<'*'> & TooltipState;

export type TooltipProps = ElementProps<'div'> & {
    label: LabelProps => Node,
    overlay: OverlayProps => Node,
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

    node: ?HTMLDivElement;
    identifier: string;

    render() {
        const { label: Label, overlay: Overlay, ...rest } = this.props;
        return (
            <div
                {...rest}
                onBlur={e => this.onBlur(e)}
                ref={node => {
                    this.node = node;
                }}
            >
                <Label
                    {...this.state}
                    labelAttributes={{
                        role: 'tooltip',
                        tabIndex: '0',
                        'aria-describedby': `#${this.identifier}`,
                        onFocus: () => this.show(),
                    }}
                    requestHide={() => this.hide()}
                    requestShow={() => this.show()}
                    requestToggle={() => this.toggle()}
                />
                <Overlay
                    {...this.state}
                    overlayAttributes={{
                        tabIndex: '-1',
                        id: this.identifier,
                        'aria-hidden': this.state.isHidden,
                    }}
                    requestHide={() => this.hide()}
                    requestShow={() => this.show()}
                    requestToggle={() => this.toggle()}
                />
            </div>
        );
    }
}

export default Tooltip;
