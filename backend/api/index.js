const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Log every request
    next();
});

// Routes
const productRoutes = require('./routes/product'); // Import product routes
const qrRoutes = require('./routes/qr'); // Import QR routes

console.log('Product Routes:', productRoutes); // Debugging log
console.log('QR Routes:', qrRoutes); // Debugging log

app.use('/api/routes/product', productRoutes); // Attach product routes
app.use('/api/routes/qr', qrRoutes); // Attach QR routes

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Fake Product Identification API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});