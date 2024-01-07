import type { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { NonFungibleUkraineName } from "../../../nfu-ukr-common/constants";
import { CollectionStats } from "../../../nfu-ukr-common/contracts";
import contractAddresses from "../../../nfu-ukr-common/resources/contractAddress.json";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(404).send(`Unexpected http method: ${request.method}`);
        return;
    }
    
    const chain = process.env.NEXT_PUBLIC_CHAIN_ID!;
    // not tracking stats for local chain:
    if (chain == "31337"){
        response.status(409).send("Cannot retrieve stats for local network");
        return;
    }

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

    const ownersResponse = await Moralis.EvmApi.nft.getNFTOwners({
        address,
        chain,
    });

    const balanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });

    const stats: CollectionStats = {
        balance: Number.parseFloat(balanceResponse.result.balance.ether),
        tokensMinted: ownersResponse.result.length
    };

    response.status(200).json(stats);
}