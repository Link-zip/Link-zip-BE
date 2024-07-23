module.exports = {
    presets: ['@babel/preset-env'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    '@root': '.',
                    '@config': './config',
                    '@routes': './src/routes',
                    '@controllers': './src/controllers',
                    '@services': './src/services',
                    '@providers': './src/providers',
                    '@models': './src/models',
                    '@dtos': './src/dtos',
                },
            },
        ],
    ],
};