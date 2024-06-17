import React from 'react';
import classnames from 'classnames';
import { Tooltip as ReactAccessibleTooltip } from 'react-accessible-tooltip';
import './tooltip.css';

function Tooltip({
    label,
    overlay,
}: {
    label: React.ReactNode;
    overlay: React.ReactNode;
}) {
    return (
        <ReactAccessibleTooltip
            className="tooltip"
            label={({ labelAttributes }) => (
                <span className="tooltip__label" {...labelAttributes}>
                    <strong>{label}</strong>
                </span>
            )}
            overlay={({ overlayAttributes, isHidden }) => (
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
