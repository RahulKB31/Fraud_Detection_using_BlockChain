---

# Fake Product Identification using Blockchain & QR Codes

This project secures supply chains by registering product data on a Polkadot-based blockchain and verifying authenticity via QR codes. It combats counterfeiting in industries like pharmaceuticals, electronics, and luxury goods. In a few years, it could scale into a decentralized global standard for traceable and trusted product verification across markets.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Testing the System](#testing-the-system)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Overview

This project aims to combat counterfeit products by leveraging blockchain technology. Each product is registered on the blockchain, and its journey through the supply chain is tracked via checkpoints. A QR code is generated for each product, which consumers can scan to verify the product's authenticity.

---

## Features

- **Product Registration**: Register products on the blockchain with unique serial numbers.
- **Supply Chain Tracking**: Add checkpoints to track the product's journey through the supply chain.
- **QR Code Generation**: Generate QR codes containing product details and checkpoints.
- **Product Verification**: Verify the authenticity of a product by scanning its QR code.
- **Decentralized Ledger**: All data is stored on a blockchain for transparency and immutability.

---

## Project Structure

```
fake_product_identification/
│
├── backend/                      # Backend API and parachain setup
│   ├── api/                      # Backend API code
│   │   ├── index.js              # Main entry point for the backend API
│   │   ├── routes/               # API routes (e.g., product.js, qr.js)
│   │   ├── utils/                # Utility functions (e.g., blockchain.js)
│   │   └── .env                  # Environment variables
│   └── parachain/                # Parachain node setup
│
├── frontend/                     # Frontend application
│   ├── src/                      # React Native source code
│   ├── public/                   # Public assets (e.g., QR codes)
│   └── package.json              # Frontend dependencies
│
├── smart-contracts/              # Smart contracts for product authentication
│   ├── contracts/                # Solidity contract source code
│   ├── migrations/               # Deployment scripts
│   └── truffle-config.js         # Truffle configuration
│
├── docs/                         # Documentation files
└── README.md                     # This file
```

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download Node.js](https://nodejs.org/))
- **npm**: Installed with Node.js
- **Rust**: For building the parachain node ([Install Rust](https://www.rust-lang.org/tools/install))
- **Truffle**: For deploying smart contracts (`npm install -g truffle`)
- **Expo CLI**: For running the frontend app (`npm install -g expo-cli`)
- **Parachain Node**: Ensure the parachain node is built and running locally.

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repo/fake-product-identification.git
cd fake-product-identification
```

### 2. Install Backend Dependencies
Navigate to the backend directory and install dependencies:
```bash
cd backend/api
npm install
```

### 3. Install Frontend Dependencies
Navigate to the frontend directory and install dependencies:
```bash
cd ../../frontend
npm install
```

### 4. Install Smart Contract Dependencies
Navigate to the smart contracts directory and install dependencies:
```bash
cd ../smart-contracts
npm install
```

---

## Running the Application

### 1. Start the Parachain Node
Build and run the parachain node in development mode:
```bash
cd ../backend/parachain
cargo build --release
./target/release/node-template --dev
```

### 2. Deploy Smart Contracts
Compile and deploy the smart contracts:
```bash
cd ../smart-contracts
truffle compile
truffle migrate --network development
```

### 3. Start the Backend API
Start the backend server:
```bash
cd ../api
node index.js
```

The backend API will run on `http://localhost:3000`.

### 4. Run the Frontend App
Start the React Native frontend app:
```bash
cd ../../frontend
expo start
```

Open the Expo Go app on your mobile device and scan the QR code to run the app.

---

## API Endpoints

### Product Routes
- **Register a Product**
  ```
  POST /api/product/register
  Body: { "serialNumber": "PROD12345" }
  ```

- **Add a Checkpoint**
  ```
  POST /api/product/checkpoint
  Body: { "serialNumber": "PROD12345", "location": "Warehouse A" }
  ```

### QR Routes
- **Generate a QR Code**
  ```
  POST /api/qr/generate
  Body: { "serialNumber": "PROD12345" }
  ```

---

## Testing the System

### 1. Test the Backend API
Use tools like `curl` or Postman to test the API endpoints.

- **Register a Product**
  ```bash
  curl -X POST http://localhost:3000/api/product/register \
  -H "Content-Type: application/json" \
  -d '{"serialNumber": "PROD12345"}'
  ```

- **Add a Checkpoint**
  ```bash
  curl -X POST http://localhost:3000/api/product/checkpoint \
  -H "Content-Type: application/json" \
  -d '{"serialNumber": "PROD12345", "location": "Warehouse A"}'
  ```

- **Generate a QR Code**
  ```bash
  curl -X POST http://localhost:3000/api/qr/generate \
  -H "Content-Type: application/json" \
  -d '{"serialNumber": "PROD12345"}'
  ```

### 2. Test the Frontend App
Scan the generated QR code using the frontend app to verify the product's authenticity.

---

## Troubleshooting

### 1. Missing `.env` File
Ensure the `.env` file exists in the `backend/api` directory and contains the following:
```plaintext
BLOCKCHAIN_RPC_URL=ws://127.0.0.1:9944
ADMIN_ACCOUNT=5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
PORT=3000
```

### 2. Port Conflicts
If port `3000` is already in use, change the port in the `.env` file:
```plaintext
PORT=4000
```

### 3. Blockchain Node Not Running
Ensure the parachain node is running and accessible at `ws://127.0.0.1:9944`.

### 4. Syntax Errors
Use a linter or formatter to catch syntax errors in your code.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
