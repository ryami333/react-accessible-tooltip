import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ComponentType } from 'react';

export type LabelProps = {
    labelAttributes: {
        tabIndex: 0;
        'aria-describedby': string;
        onFocus: () => void;
    };
    isHidden: boolean;
};

export type OverlayProps = {
    overlayAttributes: {
        role: 'tooltip';
        tabIndex: -1;
        id: string;
        'aria-hidden': boolean;
    };
    isHidden: boolean;
};

export type TooltipProps = React.HTMLAttributes<HTMLDivElement> & {
    label: ComponentType<LabelProps>;
    overlay: ComponentType<OverlayProps>;
};

export function Tooltip({
    label: Label,
    overlay: Overlay,
    ...rest
}: TooltipProps) {
    const identifier = `react-accessible-tooltip-${useId()}`;

    const [state, setState] = useState<{
        isFocused: boolean;
        isHovered: boolean;
    }>({
        isFocused: false,
        isHovered: false,
    });

    useEffect(() => {
        const onKeyDown = ({ key }: KeyboardEvent) => {
            if (key === 'Escape') {
                setState((current) => ({ ...current, isFocused: false }));
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        // This handles the support for touch devices that do not trigger blur on 'touch-away'.
        const onTouchStart = ({ target }: Event) => {
            const { activeElement } = document;

            const container = containerRef.current;

            if (
                activeElement instanceof Element &&
                target instanceof Element &&
                container instanceof Element &&
                !container.contains(target) // touch target not a tooltip descendent
            ) {
                setState((current) => ({ ...current, isFocused: false })); // TODO: prevent redundant state change.
                if (activeElement instanceof HTMLElement) {
                    activeElement.blur();
                }
            } else if (
                activeElement instanceof Element &&
                target instanceof Element &&
                container instanceof Element &&
                container.contains(target) // touch target is on tooltip descendant
            ) {
                setState((current) => ({ ...current, isFocused: true })); // TODO: prevent redundant state change.
            }
        };

        document.addEventListener('touchstart', onTouchStart);

        return () => document.removeEventListener('touchstart', onTouchStart);
    }, []);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const { isFocused, isHovered } = state;
    const isHidden = !(isFocused || isHovered);

    const onFocus = useCallback(
        () => setState((current) => ({ ...current, isFocused: true })), // TODO: prevent redundant state change
        [],
    );

    const labelProps: LabelProps = {
        labelAttributes: {
            tabIndex: 0,
            'aria-describedby': identifier,
            onFocus: onFocus,
        },
        isHidden,
    };

    const overlayProps: OverlayProps = {
        overlayAttributes: {
            role: 'tooltip',
            tabIndex: -1,
            id: identifier,
            'aria-hidden': isHidden,
        },
        isHidden,
    };

    const onBlur = useCallback<React.FocusEventHandler>(
        ({ relatedTarget, currentTarget }) => {
            // relatedTarget is better for React testability etc, but activeElement works as an IE11 fallback:
            const newTarget = relatedTarget || document.activeElement;

            // The idea of this logic is that we should only close the tooltip if focus has shifted from the tooltip AND all of its descendents.
            if (!(newTarget && newTarget instanceof HTMLElement)) {
                setState((current) => ({ ...current, isFocused: false }));
            } else if (!currentTarget.contains(newTarget)) {
                setState((current) => ({ ...current, isFocused: false }));
            }
        },
        [],
    );

    const onMouseEnter = useCallback<React.MouseEventHandler>(
        () => setState((current) => ({ ...current, isHovered: true })),
        [],
    );

    const onMouseLeave = useCallback<React.MouseEventHandler>(
        () => setState((current) => ({ ...current, isHovered: false })),
        [],
    );

    return (
        <span
            {...rest}
            onBlur={onBlur}
            ref={containerRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <Label {...labelProps} />
            <Overlay {...overlayProps} />
        </span>
    );
}

export default Tooltip;
