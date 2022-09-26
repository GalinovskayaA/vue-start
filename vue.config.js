module.exports = {
    configureWebpack: {
        plugins: [
            require('unplugin-auto-import/webpack')({
                imports: [
                    'vue',
                    'vue/macros',
                    'vue-router',
                ],
                vueTemplate: true,
            }),
        ],
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-start/'
        : '/'
}

// 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