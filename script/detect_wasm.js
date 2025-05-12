const puppeteer = require('puppeteer');

async function detectWASM(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const wasmFiles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('script'))
            .filter(script => script.src.includes('.wasm'))
            .map(script => script.src);
    });

    console.log(wasmFiles.length > 0 ? `⚠️ WebAssembly files detected: ${wasmFiles.join(", ")}` : "✅ No WebAssembly threats detected.");
    await browser.close();
}

const urlToCheck = process.argv[2] || "http://example.com";
detectWASM(urlToCheck);
