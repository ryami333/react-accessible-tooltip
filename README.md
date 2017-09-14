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

### Props

#### `label` function({ isHidden, labelAttributes, requestHide, requestShow, requestToggle }): React.Node
The `label` prop requires a render function. The function's arguments contains the following properties:
- `isHidden` (boolean): The current state of the tooltip.
- `labelAttributes` (object): The various attributes which ought to be assigned to the outer-most element in your render function (eg. `<span {...labelAttributes} />`).
- `requestHide` (function): Callable which manually sets the state of the tooltip to 'hidden'.
- `requestShow` (function): Callable which manually sets the state of the tooltip to 'shown'.
- `requestToggle` (function): Callable which manually toggles the state of the tooltip between 'shown' or 'hidden'.

#### `overlay` function({ isHidden, overlayAttributes, requestHide, requestShow, requestToggle }): React.Node
The `label` prop requires a render function. The function's arguments contains the following properties:
- `isHidden` (boolean): The current state of the tooltip.
- `overlayAttributes` (object): The various attributes which ought to be assigned to the outer-most element in your render function (eg. `<span {...labelAttributes} />`).
- `requestHide` (function): Callable which manually sets the state of the tooltip to 'hidden'.
- `requestShow` (function): Callable which manually sets the state of the tooltip to 'shown'.
- `requestToggle` (function): Callable which manually toggles the state of the tooltip between 'shown' or 'hidden'.

## License

[MIT](LICENSE).
