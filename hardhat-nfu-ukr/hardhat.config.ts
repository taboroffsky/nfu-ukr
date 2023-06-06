import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const ETHERNET_RPC_URL = process.env.ETHERNET_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ANDRII_PRIVATE_KEY = process.env.ANDRII_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        goerli: {
            chainId: 5,
            blockConfirmations: 2,
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        mainnet: {
            chainId: 1,
            blockConfirmations: 2,
            url: ETHERNET_RPC_URL,
            gasPrice: 23000000000,
            accounts: [ANDRII_PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            mainnet: ETHERSCAN_API_KEY
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.13",
                settings:{
                    optimizer:{
                        enabled: true,
                        runs: 20
                    }
                }
            },
            {
                version: "0.8.17",
                settings:{
                    optimizer:{
                        enabled: true,
                        runs: 20
                    }
                }
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    mocha: {
        timeout: 200000,
    },
};
