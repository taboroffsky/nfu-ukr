export interface TokenMetadata {
    name: string;
    description: string;
    image: string;
}

export interface Token {
    name: string;
    tokenUri: string;
}

export interface ContractAddress {
    [chainId: string]: { [contractName: string]: string };
}

export interface ContractAbi {
    [contractName: string]: any;
}
export interface TeamMember {
    name: string;
    role: string;
    image: string;
}
