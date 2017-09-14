// @flow

import React from 'react';
import classnames from 'classnames';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
    const HIDDEN_CLASS = 'HIDDEN_CLASS';
    const LABEL_CLASS = 'LABEL_CLASS';
    const OVERLAY_CLASS = 'OVERLAY_CLASS';

    const Label = ({ isHidden, labelAttributes }) => {
        return (
            <div
                className={classnames(LABEL_CLASS, {
                    [HIDDEN_CLASS]: isHidden,
                })}
                {...labelAttributes}
            />
        );
    };

    const CloseButton = props => <button {...props} />;

    const Overlay = ({ isHidden, requestHide, overlayAttributes }) => {
        return (
            <div
                className={classnames(OVERLAY_CLASS, {
                    [HIDDEN_CLASS]: isHidden,
                })}
                {...overlayAttributes}
            >
                <CloseButton onClick={requestHide}>close</CloseButton>
            </div>
        );
    };

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

    it('reveals the overlay when the label is focussed, and hides the overlay when the whole tooltip is blurred.', () => {
        label.simulate('focus');
        expect(wrapper.state('isHidden')).toBeFalsy();

        overlay.simulate('focus');
        expect(wrapper.state('isHidden')).toBeFalsy();

        label.simulate('blur');
        expect(wrapper.state('isHidden')).toBeTruthy();
    });

    it('respects a manual close request', () => {
        label.simulate('focus');
        expect(wrapper.state('isHidden')).toBeFalsy();

        closeButton.simulate('click');
        expect(wrapper.state('isHidden')).toBeTruthy();
    });
});
