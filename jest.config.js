module.exports = {
  testURL: 'http://localhost:9000',
  preset: 'jest-puppeteer',
  extraSetupFiles: ['./tests/setupTests.js'],
  globals: {
    xxg: false,
  },
};
