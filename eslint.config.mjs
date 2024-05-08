import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.mocha,
                ...globals.node,
                ...globals.browser,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        ignores: ['node_modules/*', './src/configs/*'],
    },
    {
        rules: {
            indent: ['error', 4],
            'no-trailing-spaces': 'error',
            semi: ['error', 'always'],
            'eol-last': ['error', 'always'],
            quotes: ['error', 'single'],
        },
    },
];
