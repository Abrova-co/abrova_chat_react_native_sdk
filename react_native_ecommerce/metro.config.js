const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const projectRoot = __dirname;
const sdkRoot = path.resolve(projectRoot, '..');
const pushSdkRoot = path.resolve(projectRoot, '..', '..', '..', 'AbrovaPush', 'abrova-push-react-native', 'abrova-push-react-native');

const config = {
  watchFolders: [
    sdkRoot,
    pushSdkRoot,
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
