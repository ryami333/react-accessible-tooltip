import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from 'rollup-plugin-replace';
import pkg from './package.json' with { type: 'json' };

export default [
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            { file: pkg.main, format: 'umd' },
            { file: pkg['jsnext:main'], format: 'es' },
        ],
        name: 'reactAccessibleTooltip',
        plugins: [
            babel(),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
            }),
            commonjs(),
            replace({
                exclude: 'node_modules/**',
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
        ],
    },
];
