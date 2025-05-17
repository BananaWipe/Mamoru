// hardhat.config.js
require('dotenv').config();
require('@nomicfoundation/hardhat-toolbox');

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const BASE_GOERLI_RPC_URL = process.env.BASE_GOERLI_RPC_URL || "https://goerli.base.org";
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "https://mainnet.base.org";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Local development network
    hardhat: {
      chainId: 31337
    },
    // Base Goerli Testnet
    baseGoerli: {
      url: BASE_GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 84531,
      gas: 2100000,
      gasPrice: 8000000000,
      verify: {
        etherscan: {
          apiUrl: "https://api-goerli.basescan.org"
        }
      }
    },
    // Base Mainnet
    baseMainnet: {
      url: BASE_MAINNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 8453,
      gas: 2100000,
      gasPrice: 8000000000,
      verify: {
        etherscan: {
          apiUrl: "https://api.basescan.org"
        }
      }
    }
  },
  etherscan: {
    apiKey: {
      baseGoerli: ETHERSCAN_API_KEY,
      baseMainnet: ETHERSCAN_API_KEY
    },
    customChains: [
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};