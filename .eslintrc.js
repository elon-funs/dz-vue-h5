module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    // rules: {
    //   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // },
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'generator-star-spacing': 'off',
        eqeqeq: 'off',
        'vue/no-parsing-error': [
            2,
            {
                'x-invalid-end-tag': false
            }
        ],
        'no-undef': 'off',
        'no-tabs': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        camelcase: 'off',
        indent: ['error', 4]
    }
}
