const axios = require('axios');

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with a valid key

async function checkGoogleSafeBrowsing(url) {
    const response = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`, {
        client: { clientId: "yourcompany", clientVersion: "1.0" },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    });

    console.log(response.data.matches ? "⚠️ URL is flagged!" : "✅ URL is safe.");
}

const urlToCheck = process.argv[2] || "http://example.com";
checkGoogleSafeBrowsing(urlToCheck);
