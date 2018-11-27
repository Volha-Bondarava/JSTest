"use strict"

let webdriver = require('selenium-webdriver')
let basePage = require('../basePage.js')

class googleLoginPage extends basePage {

  constructor (driver) {
    super(driver, 'http://google.by')
    this.loginButton = webdriver.By.xpath('//a[.=\'Увайсьці\']')
    this.loginField = webdriver.By.css('input[type=\'email\']')
    this.passwordField = webdriver.By.name('password')
    this.googleAppsButon = webdriver.By.xpath('//a[@title=\'Google apps\']')
    this.gmailButton = webdriver.By.xpath('//*[.=\'Gmail\']')
    this.logo = webdriver.By.className('gb_bc')
  }

  async openLoginPage () {
    await this.open()
    return await this.driver.click(this.loginButton)
  }

  async typeLogin (login) {
    await this.driver.typeAndSubmit(this.loginField, login)
    return await this.driver.waitForElementLocated(this.passwordField)
  }

  async typePassword (password) {
    return await this.driver.typeAndSubmit(this.passwordField, password)
  }

  async openMailbox () {
    await this.driver.click(this.googleAppsButon)
    await this.driver.click(this.gmailButton)
    return await this.driver.waitForElementLocated(this.logo, 15000)
  }

}

module.exports = googleLoginPage