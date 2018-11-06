const {By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

class GoogleSearchPage {

    constructor(driver) {
        this.driver = driver;
        this.url = "http://google.by";
        this.searchField = webdriver.By.name('q');
        this.resultStats = webdriver.By.id('resultStats');
        this.searchResults = webdriver.By.xpath("//div[@id='search']//h3");
        this.searchButton = webdriver.By.name('btnK');
    };

    open() {
        return this.driver.get(this.url);
    };

    typeSearchQuery = function (text) {
        return this.driver.findElement(this.searchField).sendKeys(text);
    };

    clickSearchButton = async function() {
        await this.driver.findElement(this.searchButton).click();
        return this.driver.wait(until.titleIs('iTechArt - Пошук Google'));
    };

    getQuantityOfSearchResults = async function() {
        let text = await this.driver.findElement(By.id('resultStats')).getText();
        text = text.substring(0, text.length - 11);
        return parseInt(text.replace(/\D+/g, ""));
    };

    getSearchResults = async function() {
        return await this.driver.findElements(this.searchResults);
    };
}
module.exports = GoogleSearchPage;