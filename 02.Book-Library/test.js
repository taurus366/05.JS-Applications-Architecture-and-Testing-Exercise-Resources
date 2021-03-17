const {expect, assert} = require('chai')
const {chromium} = require('playwright-chromium');
// const {} = require('mocha');
let browser, page;

describe('E2E tests', function () {
    this.timeout(60000)
    before(async () => {
        browser = await chromium.launch({headless: false, slowMo: 1500})
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('Testing: load books', async () => {
        await page.goto('http://localhost:3000/');
        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('td');


        const text = await page.$$eval("tbody >> tr >> td:first-child", tr => tr.map(tr => tr.textContent.trim()));
        // console.log(text)
        expect(text[0]).to.be.equal('Harry Potter and the Philosopher\'s Stone');
        expect(text[1]).to.be.equal('C# Fundamentals');


    });

    it('Testing: add book', async () => {
        await page.goto('http://localhost:3000/');
        await page.fill('[name="title"]', 'test');
        await page.fill('[name="author"]', '12345');
        await page.click('text=Submit');
        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('td');

        const title = await page.textContent("tbody >> tr:last-child >> td:nth-child(1)");
        const author = await page.textContent("tbody >> tr:last-child >> td:nth-child(2)");

        expect(title).to.equal('test');
        expect(author).to.equal('12345');

    });

    it('Testing: edit book', async () => {
        await page.goto('http://localhost:3000/');
        await page.click('text=LOAD ALL BOOKS');


        await page.click('tbody >> tr:last-child >> td:last-child >> text=Edit');

        await page.isVisible('#editForm')

        await page.waitForSelector('#editForm >> text=Save');

        await page.fill('#editForm >> [name="title"]', 'test');

        await page.fill('#editForm >>[name="author"]', 'test');
        await page.click('#editForm >> text=Save');
        await page.click('text=LOAD ALL BOOKS');


        const title = await page.textContent("tbody >> tr:last-child >> td:nth-child(1)");
        const author = await page.textContent("tbody >> tr:last-child >> td:nth-child(2)");

        expect(title).to.equal('test');
        expect(author).to.equal('test');

    });

    // it.only('Testing: delete book', async () => {
    //     await page.goto('http://localhost:3000/');
    //     await page.click('text=LOAD ALL BOOKS');
    //
    //
    //     await page.click('tbody >> tr:last-child >> td:last-child >> text=Delete');
    //
    //     await page.click('text=OK');
    //
    //
    //     await page.click('text=LOAD ALL BOOKS');
    //
    //
    //     const title = await page.textContent("tbody >> tr:last-child >> td:nth-child(1)");
    //     const author = await page.textContent("tbody >> tr:last-child >> td:nth-child(2)");
    //
    //     expect(title).to.equal('Harry Potter and the Philosopher\'s Stone');
    //     expect(author).to.equal('J.K.Rowling');
    //
    // });


});


