module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': '.',
            '@components': './components',
            '@screens': './app/(screens)',
            '@utils': './utils',
            '@hooks': './hooks',
            '@assets': './assets'
          },
        },
      ],
    ],
  };
};