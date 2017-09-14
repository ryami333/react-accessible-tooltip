// @flow

import React, { Component } from 'react';
import consecutive from 'consecutive';
import type { TooltipProps, TooltipState } from './Tooltip.flow';

const next = consecutive();

class Tooltip extends Component<TooltipProps, TooltipState> {
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

    identifier = `react-accessible-tooltip-${next()}`;

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
