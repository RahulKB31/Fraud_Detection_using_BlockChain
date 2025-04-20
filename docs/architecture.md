# System Architecture Overview

The Fake Product Identification by QR Code Using Blockchain project leverages a Polkadot parachain to ensure transparency and security in the supply chain. Below is an overview of the system architecture:

## 1. Components

### 1.1 Frontend
- **Purpose**: Provides a user-friendly interface for consumers and businesses.
- **Features**:
  - Scan QR codes using a mobile app.
  - Display product details and supply chain checkpoints.
  - Verify product authenticity.
- **Technology**: React Native, Expo Camera, Axios.

### 1.2 Backend
- **Purpose**: Acts as an intermediary between the frontend and the blockchain.
- **Features**:
  - REST API endpoints for product registration, checkpoint updates, and verification.
  - QR code generation utilities.
  - Blockchain interaction using Polkadot.js API.
- **Technology**: Node.js, Express, Polkadot.js.

### 1.3 Parachain
- **Purpose**: Stores product data and ensures tamper-proof tracking.
- **Features**:
  - Smart contracts for product authentication and supply chain tracking.
  - Immutable ledger for storing product checkpoints.
- **Technology**: Substrate, Solidity (for smart contracts), Truffle.

### 1.4 Blockchain
- **Purpose**: Provides decentralized and secure storage for all product-related data.
- **Technology**: Polkadot parachain, Substrate runtime.

## 2. Workflow

1. **Product Registration**:
   - A manufacturer registers a product on the blockchain via the backend API.
   - The product's serial number, manufacturer, and creation timestamp are stored.

2. **Checkpoint Updates**:
   - Supply chain participants (e.g., warehouses, distributors) add checkpoints to the product's journey.

3. **QR Code Generation**:
   - A QR code is generated for the product, containing its serial number and blockchain metadata.

4. **Verification**:
   - Consumers scan the QR code using the frontend app.
   - The app queries the blockchain to verify the product's authenticity and display its supply chain journey.

## 3. Diagram
