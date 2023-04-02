import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Moralis from "moralis";
import { StorageFilePath, NonFungibleUkraineName } from "../../../nfu-ukr-common/constants";
import { Token, TokenMetadata } from "../../../nfu-ukr-common/contracts";
import contractAddresses from "../../../nfu-ukr-common/resources/contractAddress.json";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(404).send(`Unexpected http method: ${request.method}`);
        return;
    }

    const tokensFromStorage = getTokensFromStorage();
    if (!tokensFromStorage) {
        response.status(500).send("Request failed. View server logs for more details.");
        return;
    }

    const unavailableTokenNames = await getUnavailableTokenNames();
    if (!unavailableTokenNames) {
        response.status(409).json(tokensFromStorage);
        return;
    }

    const availableTokens = tokensFromStorage.filter((token) => !unavailableTokenNames.includes(token.name));
    response.status(200).json(availableTokens);
}

const getTokensFromStorage: () => Token[] | undefined = function () {
    try {
        const readStream = fs.readFileSync("../" + StorageFilePath);
        const tokens: Token[] = JSON.parse(readStream.toString());
        return tokens;
    } catch (exception) {
        console.log("Failed to get tokens from local storage:");
        console.error(exception);
    }
};

const getUnavailableTokenNames: () => Promise<string[] | undefined> = async function () {
    try {
        const chain = process.env.NEXT_PUBLIC_CHAIN_ID!;
        // not tracking minted tokens for local chain:
        if (chain == "31337"){
            return new Array<string>();
        }

        const tokensPerArt = process.env.TOKENS_PER_ART!;
        const address: string = (contractAddresses as any)[chain][NonFungibleUkraineName];

        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({
                    apiKey: process.env.MORALIS_API_KEY!,
                });
            }
        } catch (exception) {
            console.log("Failed to start Moralis:");
            console.error(exception);
            return;
        }

        const moralisResponse = await Moralis.EvmApi.nft.getNFTOwners({
            address,
            chain,
        });

        const numberOfMintedTokensPerName = new Map<string, number>();
        const result: string[] = [];

        moralisResponse.result
            .map((result) => (result.metadata as unknown as TokenMetadata).name)
            .forEach((name) => {
                numberOfMintedTokensPerName[name] = numberOfMintedTokensPerName[name] || 0;
                numberOfMintedTokensPerName[name]++;

                if(numberOfMintedTokensPerName[name] === 4){
                    result.push(name);
                }
            });

        return result;
    } catch (exception) {
        console.log("Failed to get token owners from Moralis:");
        console.error(exception);
    }
};
