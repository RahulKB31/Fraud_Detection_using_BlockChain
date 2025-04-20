const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ProductAuth', () => {
    let productAuth, owner, user;

    beforeEach(async () => {
        [owner, user] = await ethers.getSigners();
        const ProductAuth = await ethers.getContractFactory('ProductAuth');
        productAuth = await ProductAuth.deploy();
        await productAuth.deployed();
    });

    it('should register a product', async () => {
        const serialNumber = 'PROD12345';
        await productAuth.connect(owner).registerProduct(serialNumber);
        const [serial, manufacturer, createdAt, checkpoints] = await productAuth.verifyProduct(serialNumber);
        expect(serial).to.equal(serialNumber);
        expect(manufacturer).to.equal(owner.address);
    });

    it('should add a checkpoint to a product', async () => {
        const serialNumber = 'PROD12345';
        const location = 'Warehouse A';
        await productAuth.connect(owner).registerProduct(serialNumber);
        await productAuth.connect(owner).addCheckpoint(serialNumber, location);
        const [, , , checkpoints] = await productAuth.verifyProduct(serialNumber);
        expect(checkpoints.length).to.equal(1);
        expect(checkpoints[0].location).to.equal(location);
    });

    it('should verify a product', async () => {
        const serialNumber = 'PROD12345';
        await productAuth.connect(owner).registerProduct(serialNumber);
        const [serial, manufacturer, createdAt, checkpoints] = await productAuth.verifyProduct(serialNumber);
        expect(serial).to.equal(serialNumber);
        expect(manufacturer).to.equal(owner.address);
        expect(checkpoints.length).to.equal(0);
    });
});