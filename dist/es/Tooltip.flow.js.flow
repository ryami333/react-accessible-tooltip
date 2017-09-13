// @flow

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
