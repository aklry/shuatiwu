module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'react-hooks/ exhaustive-deps': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
