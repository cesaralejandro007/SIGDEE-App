module.exports = {
    preset: 'react-native',
    testPathIgnorePatterns: [
      '/expo/',
      '/config/',
      '/RSA/',
      '/modelo/',
      '/vistas/',
    ],
    setupFiles: [
      './node_modules/react-native-gesture-handler/jestSetup.js',
    ],
    transformIgnorePatterns: [
      '/node_modules/(?!(react-native|react-native-vector-icons)/)',
    ],
  };
  