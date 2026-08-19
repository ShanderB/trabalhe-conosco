/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    // Inclui .mjs/.cjs além de .ts(x)/.js(x): algumas dependências do MSW
    // (ex.: rettime) são publicadas só em ESM (.mjs), sem build CJS, e
    // precisam passar pelo Babel para rodar sob o runtime CommonJS do Jest.
    '^.+\\.(ts|tsx|js|jsx|mjs|cjs)$': ['babel-jest', { configFile: './babel.jest.config.cjs' }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(?:msw|@mswjs|@bundled-es-modules|until-async|rettime|@open-draft|is-node-process|outvariant|strict-event-emitter|headers-polyfill)/)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};
