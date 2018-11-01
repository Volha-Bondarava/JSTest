const {Key, By, until} = require('selenium-webdriver');
let webdriver = require('selenium-webdriver');

describe("test", function () {
    let driver;

    beforeAll(async function () {
        driver = await new webdriver.Builder().forBrowser("chrome").build();
    });

    afterAll(async function () {
        await driver.quit();
    });

    it('Google Search', async function () {
        driver.get('http://google.by');
        await driver.findElement(By.name('q')).sendKeys('iTechArt', Key.RETURN);
        driver.wait(until.titleIs('iTechArt - Пошук Google'), 5000);

        let text = await driver.findElement(By.id('resultStats')).getText();
        text = text.substring(0, text.length - 11);
        let number = parseInt(text.replace(/\D+/g, ""));
        console.log("Количество результатов: " + number);

        let isOk = false;
        let results = [];
        setTimeout(async function () {
            //results = await driver.findElements(By.xpath("//*[@class='g']"));
            results = await driver.findElements(By.xpath("//h3"));
        }, 10000);
        results.forEach(result => {
            //isOk = (result.getAttribute("class").indexOf("iTechArt") !== -1);
            //console.log(result.findElement(By.xpath("//h3")).getText());
            console.log(result.getText());
        });
        //expect(isOk).toBe(true);
    });
});
