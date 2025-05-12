const puppeteer = require('puppeteer');

async function detectHiddenIframes(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const hiddenIframes = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('iframe'))
            .filter(iframe => iframe.width === "0" || iframe.height === "0" || iframe.style.display === "none")
            .map(iframe => iframe.src);
    });

    console.log(hiddenIframes.length > 0 ? `⚠️ Hidden iFrames found: ${hiddenIframes.join(", ")}` : "✅ No hidden iFrames detected.");
    await browser.close();
}

const urlToCheck = process.argv[2] || "http://example.com";
detectHiddenIframes(urlToCheck);
