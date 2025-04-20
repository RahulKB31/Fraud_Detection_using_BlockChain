import Api from '@polkadot/api/promise';
import { WsProvider } from '@polkadot/rpc-provider/ws';

const { ApiPromise, WsProvider } = require('@polkadot/api');
const QRCode = require('qrcode');

class BlockchainUtils {
    constructor(nodeUrl) {
        this.nodeUrl = nodeUrl || process.env.BLOCKCHAIN_RPC_URL || 'ws://127.0.0.1:9944';
        this.api = null;
    }

    async connect() {
        if (!this.api) {
            const provider = new WsProvider(this.nodeUrl);
            this.api = await ApiPromise.create({ provider });
            console.log('Connected to blockchain node');
        }
    }

    async verifyProduct(serialNumber) {
        await this.connect();
        const product = await this.api.query.productAuth.products(serialNumber);
        return product.toJSON();
    }

    async generateQRCode(serialNumber) {
        const product = await this.verifyProduct(serialNumber);
        if (!product) throw new Error('Product not found or fake');

        const qrData = JSON.stringify({
            serialNumber,
            manufacturer: product.manufacturer,
            createdAt: product.created_at,
            checkpoints: product.checkpoints,
        });

        return await QRCode.toDataURL(qrData);
    }
}

const blockchainUtils = new BlockchainUtils();
module.exports = {
    verifyProduct: blockchainUtils.verifyProduct.bind(blockchainUtils),
    generateQRCode: blockchainUtils.generateQRCode.bind(blockchainUtils),
};