let webdriver = require('selenium-webdriver')
let basePage = require('.//basePage')

class googleTranslatePage extends basePage{
  constructor (driver) {
    super(driver, 'https://translate.google.by')
    this.wordField = webdriver.By.id('source')
    this.resultField = webdriver.By.id('result_box')
    this.translateButton = webdriver.By.id('gt-submit')
    this.swapButton = webdriver.By.id('gt-swap')
    this.langFromButtonXpath = '//*[@id=\'gt-sl-gms\']'
    this.langToButtonXpath = '//*[@id=\'gt-tl-gms\']'
  }

  async typeWordAndSubmit (lang, word) {
    await this.driver.type(this.wordField, word)
    return await this.driver.click(this.translateButton)
  }

  async chooseLangs (f_aria_owns, t_aria_owns) {
    await this.driver.click(this.langFromButtonXpath)
    await this.driver.click(webdriver.By.xpath(`//*[@aria-owns=${f_aria_owns}]`))
    await this.driver.click(this.langToButtonXpath)
    return await this.driver.click(webdriver.By.xpath(`//*[@aria-owns=${t_aria_owns}]`))
  }

  async swapLangs () {
    return await this.driver.click(this.swapButton)
  }

  async getTranslation () {
    return this.driver.getElementText(this.resultField)
  }
}

module.exports = googleTranslatePage