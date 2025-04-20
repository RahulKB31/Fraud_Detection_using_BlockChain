const path = require("path");

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/abis"),
    networks: {
        development: {
            host: "127.0.0.1", // Local Ganache or Ethereum node
            port: 3000,       // Default Ganache port
            network_id: "*",  // Match any network ID
        },
    },
    compilers: {
        solc: {
            version: "0.8.0", // Solidity compiler version
        },
    },
};