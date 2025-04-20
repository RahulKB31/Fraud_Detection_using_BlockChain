const ProductAuth = artifacts.require("ProductAuth");
const SupplyChain = artifacts.require("SupplyChain");

module.exports = function (deployer) {
    deployer.deploy(ProductAuth);
    deployer.deploy(SupplyChain);
};