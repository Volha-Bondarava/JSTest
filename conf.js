exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec/test/protractorSearchTestSpec.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 15000,
    showColors: true
  },
  getPageTimeout: 15000
}