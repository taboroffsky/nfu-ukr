import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Moralis from "moralis";
import { StorageFilePath, NonFungibleUkraineName } from "../../../nfu-ukr-common/constants";
import { StorageToken, TokenMetadata } from "../../../nfu-ukr-common/contracts";
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

    const mintedTokenNames = await getMintedTokenNames();
    if (!mintedTokenNames) {
        response.status(409).json(tokensFromStorage);
        return;
    }

    const availableTokens = tokensFromStorage.filter((token) => !mintedTokenNames.includes(token.name));
    response.status(200).json(availableTokens);
}

const getTokensFromStorage: () => StorageToken[] | undefined = function () {
    try {
        const readStream = fs.readFileSync("../" + StorageFilePath);
        const tokens: StorageToken[] = JSON.parse(readStream.toString());
        return tokens;
    } catch (exception) {
        console.log("Failed to get tokens from local storage:");
        console.error(exception);
    }
};

const getMintedTokenNames: () => Promise<string[] | undefined> = async function () {
    try {
        const chain = process.env.NEXT_PUBLIC_CHAIN_ID!;
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

        return moralisResponse.result.map((result) => (result.metadata as unknown as TokenMetadata).name);
    } catch (exception) {
        console.log("Failed to get token owners from Moralis:");
        console.error(exception);
    }
};
