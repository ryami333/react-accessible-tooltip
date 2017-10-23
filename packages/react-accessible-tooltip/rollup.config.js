import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import flow from 'rollup-plugin-flow';
import pkg from './package.json';

export default [
    {
        entry: 'src/index.js',
        external: ['react'],
        targets: [
            { dest: pkg.main, format: 'umd' },
            { dest: pkg['jsnext:main'], format: 'es' },
        ],
        moduleName: 'reactAccessibleTooltip',
        plugins: [
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            commonjs(),
            eslint(),
            flow(),
            babel(),
            replace({
                exclude: 'node_modules/**',
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
        ],
    },
];
