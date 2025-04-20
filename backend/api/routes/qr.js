const express = require('express');
const router = express.Router();
const { generateQRCode } = require('../utils/blockchain');

// Example route: Generate a QR code for a product
router.post('/generate', async (req, res) => {
    const { serialNumber } = req.body;
    if (!serialNumber) {
        return res.status(400).json({ error: 'Serial number is required' });
    }

    try {
        console.log(`Generating QR code for product with serial number: ${serialNumber}`);
        const qrCodeURL = await generateQRCode(serialNumber);
        res.status(200).json({ qrCodeURL });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// Export the router
module.exports = router; // Ensure this line exists