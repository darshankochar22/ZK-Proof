// Load environment variables from .env file
require("dotenv").config();

// Toolbox has compatibility issues - using minimal setup
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Ethereum Sepolia Testnet (Free test ETH from faucet)
    sepolia: {
      type: "http",
      url: process.env.SEPOLIA_RPC_URL || "https://rpc2.sepolia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      timeout: 120000, // 120 seconds timeout
      gasPrice: "auto",
      chainId: 11155111,
    },

    // Polygon Mumbai Testnet (Free test MATIC from faucet)
    mumbai: {
      type: "http",
      url:
        process.env.MUMBAI_RPC_URL ||
        "https://polygon-mumbai-bor-rpc.publicnode.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      timeout: 60000,
      gasPrice: "auto",
    },

    // Polygon Amoy Testnet (Mumbai replacement)
    amoy: {
      type: "http",
      url: process.env.AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      timeout: 60000,
      gasPrice: "auto",
    },

    // zkSync Sepolia Testnet
    zkSyncSepolia: {
      type: "http",
      url:
        process.env.ZKSYNC_SEPOLIA_RPC_URL || "https://sepolia.era.zksync.dev",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      timeout: 60000,
      gasPrice: "auto",
      chainId: 300,
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
