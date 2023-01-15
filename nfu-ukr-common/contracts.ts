export interface StorageToken extends TokenMetadata {
    tokenUri: string;
    descriptionUa: string;
    isListed: boolean;
}

export interface TokenMetadata {
    name: string;
    description: string;
    image: string;
}

export interface ContractAddress {
    [chainId: string]: { [contractName: string]: string };
}

export interface ContractAbi {
    [contractName: string]: any;
}
