const request = require('supertest');
const app = require('../index'); // Import the Express app
const { registerProduct, addCheckpoint, verifyProduct } = require('../../backend/api/utils/blockchain');

describe('Product API Endpoints', () => {
    const testSerialNumber = 'TEST12345';
    const testLocation = 'Test Warehouse';

    // Register a product
    it('should register a product', async () => {
        const response = await request(app)
            .post('/api/product/register')
            .send({ serialNumber: testSerialNumber });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Product registered successfully');
    });

    // Add a checkpoint to the product
    it('should add a checkpoint to a product', async () => {
        const response = await request(app)
            .post('/api/product/checkpoint')
            .send({ serialNumber: testSerialNumber, location: testLocation });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Checkpoint added successfully');
    });

    // Verify the product
    it('should verify a product', async () => {
        const response = await request(app).get(`/api/product/verify/${testSerialNumber}`);
        expect(response.status).toBe(200);
        expect(response.body.serial_number).toBe(testSerialNumber);
        expect(response.body.checkpoints.length).toBeGreaterThan(0);
    });
});