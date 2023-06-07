export interface networkConfigItem {
    name: string;
    mintFee: string;
    tokensPerUri: number;
    verificationBlockConfirmation: number;
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        mintFee: "10000000000000000", // 0.01 ETH
        tokensPerUri: 4,
        verificationBlockConfirmation: 1,
    },
    5: {
        name: "goerli",
        mintFee: "100000000000000000", // 0.1 ETH
        tokensPerUri: 4,
        verificationBlockConfirmation: 6,
    },
    1: {
        name: "mainnet",
        mintFee: "100000000000000000", // 0.1 ETH
        tokensPerUri: 4,
        verificationBlockConfirmation: 6,
    },
};

export const DevelopmentChains: string[] = ["hardhat", "localhost"];
