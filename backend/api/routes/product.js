const express = require('express');
const router = express.Router();

// Example route: Register a product
router.post('/register', async (req, res) => {
    const { serialNumber } = req.body;
    if (!serialNumber) {
        return res.status(400).json({ error: 'Serial number is required' });
    }
    try {
        // Simulate product registration logic
        console.log(`Registering product with serial number: ${serialNumber}`);
        res.status(200).json({ message: 'Product registered successfully' });
    } catch (error) {
        console.error('Error registering product:', error);
        res.status(500).json({ error: 'Failed to register product' });
    }
});

// Example route: Add a checkpoint to a product's journey
router.post('/checkpoint', async (req, res) => {
    const { serialNumber, location } = req.body;
    if (!serialNumber || !location) {
        return res.status(400).json({ error: 'Serial number and location are required' });
    }
    try {
        // Simulate adding a checkpoint
        console.log(`Adding checkpoint for product ${serialNumber} at location: ${location}`);
        res.status(200).json({ message: 'Checkpoint added successfully' });
    } catch (error) {
        console.error('Error adding checkpoint:', error);
        res.status(500).json({ error: 'Failed to add checkpoint' });
    }
});

// Export the router
module.exports = router;