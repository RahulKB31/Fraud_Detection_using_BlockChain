const express = require('express');
const productRoutes = require('./routes/product');
const qrRoutes = require('./routes/qr');

// Initialize the Express appconst express = require('express');
const productRoutes = require('./routes/product');
const qrRoutes = require('./routes/qr');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRoutes);
app.use('/api/qr', qrRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});

