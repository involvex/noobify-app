const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: false,
  platforms: ["ios", "android"],
  unstable_conditionNames: ["require", "react-native", "import"],
  blockList: [
    /node_modules\/expo-sqlite\/web\/.*/,
    /node_modules\/wa-sqlite\/.*/,
  ],
};

module.exports = config;
