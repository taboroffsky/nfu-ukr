import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DevelopmentChains, networkConfig } from "../helper-hardhat-config";
import { StorageFilePath, NonFungibleUkraineV2Name } from "../../nfu-ukr-common/constants";
import verify from "../utils/verify";
import getTokenUrisFromStorage from "../utils/getTokenUrisFromStorage";
import saveDeployOutput from "../utils/saveDeployOutput";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;
    const currentNetwork = networkConfig[chainId];
    const isDevemopmentChain = DevelopmentChains.includes(network.name);

    const tokenUrisFromStorage: string[] = getTokenUrisFromStorage("../" + StorageFilePath);
    const auctionTokenUris: string[] = tokenUrisFromStorage.slice(0, 1);
    const tokenUris: string[] = tokenUrisFromStorage.slice(1, tokenUrisFromStorage.length);

    const args = [auctionTokenUris, tokenUris, currentNetwork.tokensPerUri, currentNetwork.mintFee];

    const nonFungibleUkraineV2 = await deploy(NonFungibleUkraineV2Name, {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: currentNetwork.verificationBlockConfirmation,
    });

    if (!isDevemopmentChain && process.env.ETHERSCAN_API_KEY) {
        await verify(nonFungibleUkraineV2.address, args);
    }

    console.log("deployed at " + nonFungibleUkraineV2.address);

    saveDeployOutput(NonFungibleUkraineV2Name, chainId.toString(), nonFungibleUkraineV2);
};

export default deploy;
deploy.tags = ["all", "nonFungibleUkraineV2"];
