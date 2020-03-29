module.exports = {
    transpileDependencies: ['vuetify'],

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false,
        },
    },

    runtimeCompiler: true,

    chainWebpack: (config) => {
        config.plugins.delete('fork-ts-checker');
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap((options) => {
                return { ...options, transpileOnly: false, allowTsInNodeModules: true };
            });
    },
};
