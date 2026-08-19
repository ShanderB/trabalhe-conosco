module.exports = function importMetaEnvPlugin() {
  return {
    visitor: {
      MetaProperty(path) {
        path.replaceWithSourceString('({ env: process.env })');
      },
    },
  };
};
