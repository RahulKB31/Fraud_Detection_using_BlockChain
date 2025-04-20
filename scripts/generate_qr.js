const { generateQRCode } = require('../backend/api/utils/blockchain');
const fs = require('fs');
const path = require('path');

(async () => {
    const serialNumber = 'PROD12345'; // Replace with the actual product serial number

    try {
        console.log(`Generating QR code for product with serial number: ${serialNumber}`);
        const qrCodeURL = await generateQRCode(serialNumber);

        // Save the QR code as an image file
        const outputPath = path.join(__dirname, '..', 'public', `${serialNumber}_qr.png`);
        const base64Data = qrCodeURL.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(outputPath, base64Data, 'base64');
        console.log(`QR code saved to: ${outputPath}`);
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
})();