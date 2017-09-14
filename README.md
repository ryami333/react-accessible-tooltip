# React Accessible Tooltip

React Accessible Tooltip is a component which lets you build accessible tooltips. It handles all the interactivity and accessibility stuff, but keeps out of the way so you can use whatever markup and styling you want.

Basic usage requires you to pass 'label' and 'overlay' render functions. React Accessible Tooltip passes you both the state of the tooltip (`isHidden`) and an object full of properties you should spread across your components (`labelAttributes`, `overlayAttributes`).

## Getting started

### Installation

Install this package and it's co-dependencies:

```bash
npm install react-accessible-tooltip react react-dom
```

### Simple Usage

```js
import { Tooltip } from 'react-accessible-tooltip';
```

```jsx
<Tooltip
    label={props => (
        <span {...props.labelAttributes} className="tooltip-label">
            {`hover me for info`}
        </span>
    )}
    overlay={props => (
        <span
            {...props.overlayAttributes}
            className={props.isHidden
                ? 'tooltip-overlay tooltip-overlay--hidden'
                : 'tooltip-overlay'}
        >
            {`this is more info`}
        </span>
    )}
/>
```

## License

[MIT](LICENSE).
