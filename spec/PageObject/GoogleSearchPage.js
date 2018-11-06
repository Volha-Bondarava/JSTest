const {By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

GoogleSearchPage = function GoogleSearchPage(driver) {
    this.driver = driver;
    this.url = "http://google.by";
    this.searchField = webdriver.By.name('q');
    this.resultStats = webdriver.By.id('resultStats');
    this.searchResults = webdriver.By.xpath('//h3');
    this.searchButton = webdriver.By.name('btnK');
};

GoogleSearchPage.prototype.open = function () {
    return this.driver.get(this.url);
};

GoogleSearchPage.prototype.typeSearchQuery = function (text) {
    return this.driver.findElement(this.searchField).sendKeys(text);
};

GoogleSearchPage.prototype.clickSearchButton = async function() {
    await this.driver.findElement(this.searchButton).click();
    return this.driver.wait(until.titleIs('iTechArt - Пошук Google'));
};

GoogleSearchPage.prototype.getQuantityOfSearchResults = async function() {
    let text = await this.driver.findElement(By.id('resultStats')).getText();
    text = text.substring(0, text.length - 11);
    return parseInt(text.replace(/\D+/g, ""));
};

GoogleSearchPage.prototype.getSearchResults = async function() {
    let results = await this.driver.findElements(this.searchResults);
    results.splice(-1, 1);
    return results;
};

module.exports = GoogleSearchPage;
