export interface networkConfigItem {
    name: string;
    mintFee: string;
    tokensPerUri: number;
    //remove, this is a duplicate
    verificationBlockConfirmation: number;
}

export interface networkConfigInfo {
    [key: number]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        mintFee: "10000000000000000", // 0.01 ETH
        tokensPerUri: 5,
        verificationBlockConfirmation: 1,
    },
    5: {
        name: "goerli",
        mintFee: "100000000000000", // 0.0001 ETH
        tokensPerUri: 5,
        verificationBlockConfirmation: 6,
    },
};

export const DevelopmentChains: string[] = ["hardhat", "localhost"];
export const TokenUrisCache: string[] = ["ipfs://Qma8TuMUP5fAUT2oyuH3Ai9KdLYCwJNVVevS9TrSdxye9n", "ipfs://QmXjNfpdiSoEXhp6dN4RHAEZ8VTx6LtPbEgUDsqyWtJGoV", "ipfs://QmQGPiHHyqGi7TvsemdFvUWoTsxGsHbH7MzaaMvHDBYh3N"];
