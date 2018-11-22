let configuration = require('../support/jasmine')


describe('Google Translate', function () {
  let translatePage
  let driver

  beforeAll(async function () {
    driver = await configuration.before()
  })

  afterAll(async function () {
    await configuration.after(driver)
  })
  it('should translate properly', function () {

  })

})