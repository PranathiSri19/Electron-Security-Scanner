function levenshtein(a, b) {
    const tmp = Array.from({ length: b.length + 1 }, (_, i) => i);
    let last;
    for (let i = 0; i < a.length; i++) {
        last = i + 1;
        for (let j = 0; j < b.length; j++) {
            const old = tmp[j + 1];
            tmp[j + 1] = a[i] === b[j] ? last : Math.min(last, old, tmp[j]) + 1;
            last = old;
        }
    }
    return tmp[b.length];
}

function isPhishingUrl(url, trustedDomains) {
    for (const target of trustedDomains) {
        if (levenshtein(url, target) <= 2) {
            console.log(`⚠️ Potential phishing detected: ${url} (similar to ${target})`);
            return;
        }
    }
    console.log("✅ No phishing detected.");
}

const urlToCheck = process.argv[2] || "faceb00k.com";
const trustedDomains = ["facebook.com", "paypal.com", "google.com"];

isPhishingUrl(urlToCheck, trustedDomains);
