import React, { type Node } from 'react';
import classnames from 'classnames';
import { Tooltip as ReactAccessibleTooltip } from 'react-accessible-tooltip';
import './tooltip.scss';

function Tooltip({ label, overlay }: { label: Node, overlay: Node }) {
    return (
        <ReactAccessibleTooltip
            className="tooltip"
            label={({ labelAttributes }: { labelAttributes: Object }) => (
                <span className="tooltip__label" {...labelAttributes}>
                    <strong>{label}</strong>
                </span>
            )}
            overlay={({
                overlayAttributes,
                isHidden,
            }: {
                overlayAttributes: Object,
                isHidden: boolean,
            }) => (
                <span
                    className={classnames('tooltip__overlay', {
                        'tooltip__overlay--hidden': isHidden,
                    })}
                    {...overlayAttributes}
                >
                    <span className="tooltip__overlay-inner">{overlay}</span>
                </span>
            )}
        />
    );
}

export default Tooltip;
