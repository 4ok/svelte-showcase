```
const OFF = 'off';
const ERROR = 'error';

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
        },
    },
    extends: [
        // Common
        'eslint:recommended',
        'plugin:@next/next/recommended',
        'airbnb',
        'airbnb/hooks',

        // Typescript
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
    ],
    rules: {
        // Common
        'default-case': OFF,
        'object-curly-newline': OFF,
        'import/prefer-default-export': OFF,

        'max-len': [ERROR, {
            code: 120,
            ignoreComments: true,
        }],
        'import/order': [ERROR, {
            'newlines-between': 'always',
            pathGroups: [
                { pattern: '~/**', group: 'external', position: 'after' },
                { pattern: '*.css', group: 'sibling', position: 'after' },
            ],
            groups: [
                ['builtin', 'external'],
                ['index', 'parent', 'sibling'],
            ],
        }],

        // Typescript
        '@typescript-eslint/explicit-module-boundary-types': OFF,

        '@typescript-eslint/indent': [ERROR, 4],
        '@typescript-eslint/type-annotation-spacing': ERROR,
        '@typescript-eslint/member-delimiter-style': ERROR,
        '@typescript-eslint/explicit-function-return-type': ERROR,

        // React
        'react/prop-types': OFF,
        'react/jsx-no-bind': OFF,
        'react/jsx-indent': OFF,
        'react/jsx-indent-props': OFF,
        'react/react-in-jsx-scope': OFF,
        'react/require-default-props': OFF,
        'react/button-has-type': OFF,
        'react/no-unstable-nested-components': OFF,

        'react/jsx-sort-props': [ERROR, {
            callbacksLast: true,
            shorthandLast: true,
            ignoreCase: true,
            noSortAlphabetically: false,
            reservedFirst: true,
        }],
        'react/jsx-props-no-spreading': [ERROR, {
            html: 'enforce',
            custom: 'ignore',
            explicitSpread: 'enforce',
        }],
    },
};
```
