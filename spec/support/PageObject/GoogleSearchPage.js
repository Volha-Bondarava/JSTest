const {Key, By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

GoogleSearchPage = function GoogleSearchPage(driver) {
    this.driver = driver;
    this.url = "http://google.by";
    this.searchField = webdriver.By.name('q');
    this.resultStats = webdriver.By.id('resultStats');
    this.searchResults = webdriver.By.xpath('//h3');
};

GoogleSearchPage.prototype.open = function () {
    return this.driver.get(this.url);
};

GoogleSearchPage.prototype.search = async function (text) {
    await this.driver.findElement(this.searchField).sendKeys(text, Key.RETURN);
    return this.driver.wait(until.titleIs(`${text} - Пошук Google`));
};

GoogleSearchPage.prototype.getQuantityOfSearchResults = async function() {
    let number = await this.driver.findElement(this.resultStats).getText();
    number = number.substring(0, number.length - 11);
    return number;
};

GoogleSearchPage.prototype.getSearchResults = async function() {
    return await this.driver.findElements(this.searchResults);
};

module.exports = GoogleSearchPage;
