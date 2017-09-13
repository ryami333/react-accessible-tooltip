# React Accessible Tooltip

React Accessible Tooltip is a component which lets you build tooltip and modal components without having to think about the accessibility stuff. Basic usage requires you to pass a label component and an overlay component. React Accessible Component passes you the props to assign to them.

## Getting started

### Installation

Install this package and it's co-dependencies:

```bash
npm install react-accessible-tooltip react react-dom
```

### Simple Usage

```javascript
import { Tooltip } from 'react-accessible-tooltip';
import classnames from 'classnames'; // optional, but suggested.

tooltip = (
    <Tooltip
        label={props => {
            const { labelAttributes } = props;
            return (
                <span className="tooltip-label" {...labelAttributes}>hover me for info</span>
            );
        }}
        overlay={props => {
            const { isHidden, overlayAttributes } = props;
            return (
                <span
                    className={classnames('tooltip-overlay', {
                        'tooltip-overlay--hidden': isHidden,
                    })}
                    {...overlayAttributes}
                >
                    here is more info
                </span>
            );
        }}
    />
);
```

## License

[MIT](LICENSE).
