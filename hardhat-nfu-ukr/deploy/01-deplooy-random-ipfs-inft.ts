import { DeployFunction } from "hardhat-deploy/dist/types";
import { boolean } from "hardhat/internal/core/params/argumentTypes";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DevelopmentChains, networkConfig, TokenUrisCache } from "../helper-hardhat-config";
import { pinImagesToPinata, pinJSONToPinata } from "../utils/pinataHelper";
import verify from "../utils/verify";
import fs from "fs";

interface tokenUrisCounter {
    tokenURI: string;
    counter: number;
}

interface metadata {
    name: string;
    description: string;
    image: string;
}

let tokenUris: string[] = TokenUrisCache;

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    const currentNetwork = networkConfig[network.config.chainId!];
    const isDevemopmentChain = DevelopmentChains.includes(network.name);

    if (boolean.parse("UPLOAD_TO_PINATA", process.env.UPLOAD_TO_PINATA! || "false")) {
        const tokenUrisCounters = await uploadTokensToPinata("images", currentNetwork.tokensPerUri);
        tokenUris = tokenUrisCounters.map((counter) => counter.tokenURI);

        fs.writeFileSync("UrisCounter.json", JSON.stringify(tokenUrisCounters));
    }

    const args = [tokenUris, currentNetwork.tokensPerUri, currentNetwork.mintFee];

    const nonFungibleUkraine = await deploy("NonFungibleUkraine", {
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

const uploadTokensToPinata: (filepath: string, tokensPerUri: number) => Promise<tokenUrisCounter[]> = async function (filepath, tokensPerUri) {
    const tokenUrisCounters: tokenUrisCounter[] = [];
    const { uris: imageUploadResponses, files } = await pinImagesToPinata(filepath);

    for (let index in imageUploadResponses) {
        // consume description from somewhere
        let metadata: metadata = {
            name: files[index].replace(".png", ""),
            description: `${index} token.`,
            image: `ipfs://${imageUploadResponses[index]}`,
        };

        const pinResult = await pinJSONToPinata(metadata);
        tokenUrisCounters.push({ tokenURI: `ipfs://${pinResult}`, counter: tokensPerUri });
    }

    console.log(`Token Uris uploaded: ${tokenUrisCounters}`);
    return tokenUrisCounters;
};

export default deploy;
deploy.tags = ["all", "nonFungibleUkraine", "main"];
