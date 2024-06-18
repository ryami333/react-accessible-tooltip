# React Accessible Tooltip · ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![NPM release](https://img.shields.io/npm/v/react-accessible-tooltip.svg) ![CircleCI Status](https://circleci.com/gh/ryami333/react-accessible-tooltip.svg?style=shield&circle-token=:circle-token) ![Code coverage](https://img.shields.io/coveralls/github/ryami333/react-accessible-tooltip.svg)

Try out the **interactive demo**
[here](https://ryami333.github.io/react-accessible-tooltip/).

React Accessible Tooltip is a component which lets you build accessible
tooltips. It handles all the interactivity and accessibility stuff, but keeps
out of the way so you can use whatever markup and styling you want.

Basic usage requires you to pass 'label' and 'overlay' render functions. React
Accessible Tooltip passes you both the state of the tooltip (`isHidden`) and an
object full of properties you should spread across your components
(`labelAttributes`, `overlayAttributes`).

## Getting started

### Installation

Install this package and it's co-dependencies:

```bash
npm install react-accessible-tooltip react react-dom
```

### Basic Usage

```js
import { Tooltip } from "react-accessible-tooltip";
```

```jsx
<Tooltip
  label={(props) => (
    <span {...props.labelAttributes} className="tooltip-label">
      {`hover me for info`}
    </span>
  )}
  overlay={(props) => (
    <span
      {...props.overlayAttributes}
      className={
        props.isHidden
          ? "tooltip-overlay tooltip-overlay--hidden"
          : "tooltip-overlay"
      }
    >
      {`this is more info`}
    </span>
  )}
/>
```

### Props

#### label : `function({ isHidden, labelAttributes, requestHide, requestShow, requestToggle }) => React.Node`

The `label` prop should be passed a render function. The function will be called
with these arguments:

| Property        | Type     | Description                                                                                                                                |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| isHidden        | boolean  | The current state of the tooltip.                                                                                                          |
| labelAttributes | object   | The various attributes which ought to be assigned to the outer-most element in your render function (eg. `<span {...labelAttributes} />`). |
| requestHide     | function | Callable which manually sets the state of the tooltip to 'hidden'.                                                                         |
| requestShow     | function | Callable which manually sets the state of the tooltip to 'shown'.                                                                          |
| requestToggle   | function | Callable which manually toggles the state of the tooltip between 'shown' or 'hidden'.                                                      |

#### overlay : `function({ isHidden, overlayAttributes, requestHide, requestShow, requestToggle }) => React.Node`

The `overlay` prop should be passed a render function. The function will be
called with these arguments:

| Property          | Type     | Description                                                                                                                                  |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| isHidden          | boolean  | The current state of the tooltip.                                                                                                            |
| overlayAttributes | object   | The various attributes which ought to be assigned to the outer-most element in your render function (eg. `<span {...overlayAttributes} />`). |
| requestHide       | function | Callable which manually sets the state of the tooltip to 'hidden'.                                                                           |
| requestShow       | function | Callable which manually sets the state of the tooltip to 'shown'.                                                                            |
| requestToggle     | function | Callable which manually toggles the state of the tooltip between 'shown' or 'hidden'.                                                        |

## License

[MIT](LICENSE).
