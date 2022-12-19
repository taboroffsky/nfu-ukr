import { DeployFunction } from "hardhat-deploy/dist/types";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DevelopmentChains, networkConfig, TokenUrisCache, NonFungibleUkraineName } from "../helper-hardhat-config";
import { pinImagesToPinata, pinJSONToPinata } from "../utils/pinataHelper";
import verify from "../utils/verify";
import fs from "fs";

interface tokenUrisCounter {
    tokenUri: string;
    counter: number;
}

interface metadata {
    name: string;
    description: string;
    image: string;
}

const IpfsSchema: string = "ipfs://";
const TokenCacheFileName: string = "UrisCounter.json";
let auctionTokenUris: string[] = TokenUrisCache.slice(0, 1);
let tokenUris: string[] = TokenUrisCache.slice(1, TokenUrisCache.length);

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    const currentNetwork = networkConfig[network.config.chainId!];
    const isDevemopmentChain = DevelopmentChains.includes(network.name);

    if (boolean.parse("UPLOAD_TO_PINATA", process.env.UPLOAD_TO_PINATA! || "false")) {
        auctionTokenUris = await uploadTokensToPinata("images/auction");
        tokenUris = await uploadTokensToPinata("images");

        const tokenUrisCoutners: tokenUrisCounter[] = tokenUris.map((uri) => ({ tokenUri: uri, counter: currentNetwork.tokensPerUri }));
        fs.writeFileSync(TokenCacheFileName, JSON.stringify(tokenUrisCoutners));
    }

    const args = [auctionTokenUris, tokenUris, currentNetwork.tokensPerUri, currentNetwork.mintFee];

    const nonFungibleUkraine = await deploy(NonFungibleUkraineName, {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: currentNetwork.verificationBlockConfirmation,
    });

    if (!isDevemopmentChain && process.env.ETHERSCAN_API_KEY) {
        await verify(nonFungibleUkraine.address, args);
    }

    console.log("deployed at " + nonFungibleUkraine.address);
};

const uploadTokensToPinata: (filepath: string) => Promise<string[]> = async function (filepath) {
    const tokenUris: string[] = [];
    // this function should work with single item for better reusability;
    const { uris: imageUploadResponses, files } = await pinImagesToPinata(filepath);

    for (let index in imageUploadResponses) {
        // consume description from somewhere
        let metadata: metadata = {
            name: files[index].replace(".png", ""),
            description: `${index} token.`,
            image: `${IpfsSchema}${imageUploadResponses[index]}`,
        };

        const pinResult = await pinJSONToPinata(metadata);
        tokenUris.push(`${IpfsSchema}${pinResult}`);
    }

    console.log(`Token Uris uploaded: ${tokenUris}`);
    return tokenUris;
};

export default deploy;
deploy.tags = ["all", "nonFungibleUkraine", "main"];
