const request = require('supertest');
const app = require('../index'); // Import the Express app
const { generateQRCode } = require('../../backend/api/utils/blockchain');

describe('QR Code API Endpoints', () => {
    const testSerialNumber = 'TEST12345';

    // Generate a QR code for a product
    it('should generate a QR code for a product', async () => {
        const response = await request(app)
            .post('/api/qr/generate')
            .send({ serialNumber: testSerialNumber });

        expect(response.status).toBe(200);
        expect(response.body.qrCodeURL).toBeDefined();
        expect(typeof response.body.qrCodeURL).toBe('string');
    });

    // Test invalid input (missing serial number)
    it('should return an error for missing serial number', async () => {
        const response = await request(app).post('/api/qr/generate').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Serial number is required');
    });
});