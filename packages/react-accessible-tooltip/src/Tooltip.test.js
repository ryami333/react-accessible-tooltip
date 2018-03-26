// @flow

import classnames from 'classnames';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

// $FlowFixMe
import React16 from 'react-16';
// $FlowFixMe
import React15 from 'react-15';

import { type LabelProps, type OverlayProps } from './';

function testReact(React, Tooltip) {
    const HIDDEN_CLASS = 'HIDDEN_CLASS';
    const LABEL_CLASS = 'LABEL_CLASS';
    const OVERLAY_CLASS = 'OVERLAY_CLASS';

    const Label = ({ isHidden, labelAttributes }: LabelProps) => (
        <div
            className={classnames(LABEL_CLASS, {
                [HIDDEN_CLASS]: isHidden,
            })}
            {...labelAttributes}
        />
    );

    const CloseButton = props => <button {...props} />;

    const Overlay = ({
        isHidden,
        requestHide,
        overlayAttributes,
    }: OverlayProps) => (
        <div
            className={classnames(OVERLAY_CLASS, {
                [HIDDEN_CLASS]: isHidden,
            })}
            {...overlayAttributes}
        >
            <CloseButton onClick={requestHide}>close</CloseButton>
        </div>
    );

    let wrapper;
    let label;
    let overlay;
    let closeButton;

    beforeEach(() => {
        wrapper = mount(<Tooltip label={Label} overlay={Overlay} />);

        label = wrapper.find(Label);
        overlay = wrapper.find(Overlay);
        closeButton = wrapper.find(CloseButton);
    });

    describe(`${React.version} -`, () => {
        it('matches the previous snapshot', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it("increments the overlay's `id` attribute with each instance.", () => {
            expect(overlay.find('div').prop('id')).toEqual(
                'react-accessible-tooltip-1', // as opposed to `react-accessible-tooltip-0`
            );
        });

        it('hides the overlay by default', () => {
            expect(wrapper.state('isHidden')).toBeTruthy();
        });

        it('reveals the overlay when the label is focussed', () => {
            expect(wrapper.state('isHidden')).toBeTruthy();
            label.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();
        });

        it('hides the overlay when the whole tooltip is blurred (and focus changes to a non-recognisable target)', () => {
            expect(wrapper.state('isHidden')).toBeTruthy();
            label.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();
            label.simulate('blur', { relatedTarget: 'notAnElement' });
            expect(wrapper.state('isHidden')).toBeTruthy();
        });

        it('hides the overlay when focus shifts to a target outside the tooltip', () => {
            expect(wrapper.state('isHidden')).toBeTruthy();
            label.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();
            label.simulate('blur', { relatedTarget: 'notAnElement' });
            expect(wrapper.state('isHidden')).toBeTruthy();
        });

        it("doesn't hide the overlay when focus shifts to the tooltip overlay", () => {
            expect(wrapper.state('isHidden')).toBeTruthy();
            label.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();
            overlay.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();
        });

        it('respects a manual close request', () => {
            label.simulate('focus');
            expect(wrapper.state('isHidden')).toBeFalsy();

            closeButton.simulate('click');
            expect(wrapper.state('isHidden')).toBeTruthy();
        });

        it('respects the containerRef prop', () => {
            const containerRef = jest.fn();

            wrapper = mount(
                <Tooltip
                    label={Label}
                    overlay={Overlay}
                    containerRef={containerRef}
                />,
            );

            wrapper.simulate('touchStart', {
                type: 'touchstart',
                x: 0,
                y: 0,
            });

            expect(containerRef.mock.calls.length).toEqual(1);
            expect(containerRef.mock.calls[0][0]).toBeInstanceOf(
                HTMLDivElement,
            );
        });

        describe('touch devices -', () => {
            // let containerRef;
            let labelRef;
            let overlayRef;

            beforeAll(() => {
                const testRoot = document.createElement('div');
                ReactDOM.render(
                    <div
                    // ref={_containerRef => {
                    //     containerRef = _containerRef;
                    // }}
                    >
                        <Tooltip
                            label={({ labelAttributes }) => (
                                <div
                                    {...labelAttributes}
                                    ref={_labelRef => {
                                        labelRef = _labelRef;
                                    }}
                                />
                            )}
                            overlay={({ overlayAttributes }) => (
                                <div
                                    {...overlayAttributes}
                                    ref={_overlayRef => {
                                        overlayRef = _overlayRef;
                                    }}
                                />
                            )}
                        />
                    </div>,
                    testRoot,
                );
            });

            it('opens on focus', () => {
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('true');
                Simulate.focus(labelRef);
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('false');
            });

            it('closes on touch-away', () => {
                Simulate.focus(labelRef);
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('false');
                const testEvent = new Event('touchstart', { bubbles: true });
                // $FlowFixMe
                document.body.dispatchEvent(testEvent);
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('true');
            });

            it("doesn't close when descendant element touched", () => {
                Simulate.focus(labelRef);
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('false');
                const testEvent = new Event('touchstart', { bubbles: true });
                // $FlowFixMe;
                overlayRef.dispatchEvent(testEvent);
                expect(overlayRef.getAttribute('aria-hidden')).toEqual('false');
            });

            it('successfully unmounts without crashing', () => {
                wrapper.unmount();
            });

            it('removes touch event listeners on unmount', () => {
                const removeEventListenerSpy = jest.spyOn(
                    document,
                    'removeEventListener',
                );
                wrapper.unmount();
                expect(removeEventListenerSpy).toHaveBeenCalled();
                removeEventListenerSpy.mockReset();
                removeEventListenerSpy.mockRestore();
            });
        });
    });
}

describe('<Tooltip />', () => {
    describe('React 16', () => {
        jest.resetModules();
        jest.doMock('react', () => React16);
        // eslint-disable-next-line global-require
        const { Tooltip } = require('./');
        testReact(React16, Tooltip);
    });

    describe('React 15', () => {
        jest.resetModules();
        jest.doMock('react', () => React15);
        // eslint-disable-next-line global-require
        const { Tooltip } = require('./');
        testReact(React15, Tooltip);
    });
});
