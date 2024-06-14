import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from 'rollup-plugin-replace';
import pkg from './package.json' with { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default [
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg['jsnext:main'], format: 'es' },
        ],
        name: 'reactAccessibleTooltip',
        plugins: [
            babel({
                extensions,
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true,
                extensions,
            }),
            replace({
                exclude: 'node_modules/**',
                ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            }),
        ],
    },
];
