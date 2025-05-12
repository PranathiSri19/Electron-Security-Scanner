const tls = require('tls');

function checkSSL(url) {
    const hostname = url.replace(/(^\w+:|^)\/\//, ''); // Remove http:// or https://
    const options = { host: hostname, port: 443, rejectUnauthorized: false };

    const socket = tls.connect(options, () => {
        const cert = socket.getPeerCertificate();
        if (!cert || Object.keys(cert).length === 0) {
            console.log(`⚠️ No SSL certificate found for ${hostname}`);
        } else {
            console.log(`✅ SSL Certificate for ${hostname}:\nIssuer: ${cert.issuer.O}\nValid Until: ${cert.valid_to}`);
        }
        socket.end();
    });

    socket.on('error', () => {
        console.log(`⚠️ SSL connection failed for ${hostname}`);
    });
}

const urlToCheck = process.argv[2] || "https://example.com";
checkSSL(urlToCheck);
