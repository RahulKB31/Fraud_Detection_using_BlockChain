const { verifyProduct } = require('../backend/api/utils/blockchain');

(async () => {
    const serialNumber = 'PROD12345'; // Replace with the actual product serial number

    try {
        console.log(`Verifying product with serial number: ${serialNumber}`);
        const product = await verifyProduct(serialNumber);

        if (!product) {
            console.log('Product not found or fake');
            return;
        }

        console.log('Product Details:');
        console.log(`- Serial Number: ${product.serial_number}`);
        console.log(`- Manufacturer: ${product.manufacturer}`);
        console.log(`- Created At: ${new Date(product.created_at).toLocaleString()}`);
        console.log('- Checkpoints:');
        product.checkpoints.forEach((checkpoint, index) => {
            console.log(`  ${index + 1}. Timestamp: ${new Date(checkpoint[0]).toLocaleString()}, Location: ${checkpoint[1]}`);
        });
    } catch (error) {
        console.error('Error verifying product:', error);
    }
})();