// @flow

import React, { type Node } from 'react';
import classnames from 'classnames';
import { Tooltip as ReactAccessibleTooltip } from '../../../src';
import './tooltip.scss';

function Tooltip({ label, overlay }: { label: Node, overlay: Node }) {
    return (
        <ReactAccessibleTooltip
            className="tooltip"
            label={({ labelAttributes }: { labelAttributes: Object }) => (
                <div className="tooltip__label" {...labelAttributes}>
                    <strong>{label}</strong>
                </div>
            )}
            overlay={({
                overlayAttributes,
                isHidden,
            }: {
                overlayAttributes: Object,
                isHidden: boolean,
            }) => (
                <div
                    className={classnames('tooltip__overlay', {
                        'tooltip__overlay--hidden': isHidden,
                    })}
                    {...overlayAttributes}
                >
                    <div className="tooltip__overlay-inner">{overlay}</div>
                </div>
            )}
        />
    );
}

export default Tooltip;
