// eslint-disable-next-line no-undef
module.exports = {
    plugins: {
        '@fullhuman/postcss-purgecss': {
            content: [
                './themes/**/*.html',
                'layouts/**/*.html'
            ],
            safelist: {
                standard: [
                    'show',
                    'active',
                    'collapsed',
                    'table-responsive',
                    'd-none',
                    'row',
                    'col-md-6',
                    'my-5',
                    /^dropdown/,
                    /^nav-level-/,
                    /^is-/,
                    /^has-/,
                    /^js-/
                ],
                deep: [
                    /table/
                ],
                greedy: [
                    /administrators__/,
                    /articles__/,
                    /authors__/,
                    /categories__/,
                    /page__/,
                    /pages__/,
                    /persons__/,
                    /posts__/,
                    /programs__/,
                    /teachers__/,
                    /volumes__/
                ]
            }
        },
        autoprefixer: {},
        cssnano: {
            preset: 'default'
        }
    }
};
