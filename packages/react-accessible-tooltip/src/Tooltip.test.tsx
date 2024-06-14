/**
 * @jest-environment jsdom
 */

import React from 'react';
import classnames from 'classnames';
import { RenderResult, render, fireEvent, act } from '@testing-library/react';
import Tooltip from './Tooltip';

import type { LabelProps, OverlayProps } from './Tooltip';

const HIDDEN_CLASS = 'HIDDEN_CLASS';
const LABEL_CLASS = 'LABEL_CLASS';
const OVERLAY_CLASS = 'OVERLAY_CLASS';

describe('<Tooltip />', () => {
    const Label = ({ isHidden, labelAttributes }: LabelProps) => (
        <div
            data-testid="label"
            className={classnames(LABEL_CLASS, {
                [HIDDEN_CLASS]: isHidden,
            })}
            {...labelAttributes}
        />
    );

    const Overlay = ({ isHidden, overlayAttributes }: OverlayProps) => (
        <div
            data-testid="overlay"
            className={classnames(OVERLAY_CLASS, {
                [HIDDEN_CLASS]: isHidden,
            })}
            {...overlayAttributes}
        >
            Hello world
        </div>
    );

    let wrapper: RenderResult;
    let container: HTMLElement;
    let label: HTMLElement;
    let overlay: HTMLElement;
    let overlayDiv: HTMLElement;

    function isOverlayHidden() {
        return overlay.getAttribute('aria-hidden') === 'true';
    }

    beforeEach(() => {
        wrapper = render(
            <div data-testid="container">
                <Tooltip label={Label} overlay={Overlay} />
            </div>,
        );

        container = wrapper.getByTestId('container');
        label = wrapper.getByTestId('label');
        overlay = wrapper.getByTestId('overlay');
        overlayDiv = wrapper.getByTestId('overlay');
    });

    afterEach(() => {
        // wrapper.unmount();
    });

    describe(`${React.version} -`, () => {
        // it('matches the previous snapshot', () => {
        //     expect(toJson(wrapper)).toMatchSnapshot();
        // });

        // it("increments the overlay's `id` attribute with each instance.", () => {
        //     expect(overlay.find('div').prop('id')).toEqual(
        //         'react-accessible-tooltip-1', // as opposed to `react-accessible-tooltip-0`
        //     );
        // });

        it('hides the overlay by default', () => {
            expect(isOverlayHidden()).toBeTruthy();
        });

        it('reveals the overlay when the label is focussed', () => {
            expect(isOverlayHidden()).toBeTruthy();
            fireEvent.focus(label);
            expect(isOverlayHidden()).toBeFalsy();
        });

        it('hides the overlay when the whole tooltip is blurred (and focus changes to a non-recognisable target)', () => {
            expect(isOverlayHidden()).toBeTruthy();
            fireEvent.focus(label);
            expect(isOverlayHidden()).toBeFalsy();
            fireEvent.blur(label);
            expect(isOverlayHidden()).toBeTruthy();
        });

        it('hides the overlay when focus shifts to a target outside the tooltip', () => {
            expect(isOverlayHidden()).toBeTruthy();
            fireEvent.focus(label);
            expect(isOverlayHidden()).toBeFalsy();
            fireEvent.blur(label, { relatedTarget: container });
            expect(isOverlayHidden()).toBeTruthy();
        });

        it("doesn't hide the overlay when focus shifts to the tooltip overlay", () => {
            expect(isOverlayHidden()).toBeTruthy();
            fireEvent.focus(label);
            expect(isOverlayHidden()).toBeFalsy();
            fireEvent.blur(label, { relatedTarget: overlay });
            expect(isOverlayHidden()).toBeFalsy();
        });

        describe('hover functionality', () => {
            it('opens on mouseEnter and closes on mouseLeave', () => {
                expect(isOverlayHidden()).toBeTruthy();
                fireEvent.mouseEnter(label);
                expect(isOverlayHidden()).toBeFalsy();
                fireEvent.mouseLeave(label);
                expect(isOverlayHidden()).toBeTruthy();
            });
        });

        describe('touch devices -', () => {
            it('opens on focus', () => {
                expect(isOverlayHidden()).toBeTruthy();
                fireEvent.focus(label);
                expect(isOverlayHidden()).toBeFalsy();
            });

            it('closes on touch-away', () => {
                fireEvent.focus(label);
                expect(isOverlayHidden()).toBeFalsy();
                fireEvent.touchStart(document.body, { bubbles: true });
                expect(isOverlayHidden()).toBeTruthy();
            });

            it("doesn't close when descendant element touched", () => {
                fireEvent.focus(label);
                expect(isOverlayHidden()).toBeFalsy();
                fireEvent.touchStart(overlay, { bubbles: true });
                expect(isOverlayHidden()).toBeFalsy();
            });

            it('contains matching "aria-describedby" and "id" attributes', () => {
                const id = label.getAttribute('aria-describedby');
                expect(id).toBeTruthy();
                expect(overlay.getAttribute('id')).toEqual(id);
            });
        });
    });
});
