// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
);
// {
//     "parser": "babel-eslint",
//     "extends": [
//         "airbnb",
//         "plugin:react/recommended",
//         "prettier",
//         "prettier/react"
//     ],
//     "plugins": [
//         "react",
//         "jest",
//         "prettier"
//     ],
//     "rules": {
//         "react/jsx-filename-extension": ["off", { "extensions": [".js", ".jsx"] }],
//         "prettier/prettier": "error"
//     },
//     "env": {
//         "es6": true,
//         "browser": true,
//         "jest": true
//     }
// }
