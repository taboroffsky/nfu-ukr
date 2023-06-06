import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DevelopmentChains, networkConfig } from "../helper-hardhat-config";
import { StorageFilePath, NonFungibleUkraineName } from "../../nfu-ukr-common/constants";
import verify from "../utils/verify";
import getTokenUrisFromStorage from "../utils/getTokenUrisFromStorage";
import saveDeployOutput from "../utils/saveDeployOutput";
import getTokenUriSelector from "../utils/getTokenUriSelector";

const deploy: DeployFunction = async function ({ getNamedAccounts, deployments, network }: HardhatRuntimeEnvironment) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;
    const currentNetwork = networkConfig[chainId];
    const isDevemopmentChain = DevelopmentChains.includes(network.name);

    let tokenUris: string[] = getTokenUrisFromStorage("../" + StorageFilePath);
    tokenUris = tokenUris.map(tokenUri => getTokenUriSelector(tokenUri));

    const args = [tokenUris, currentNetwork.mintFee, currentNetwork.tokensPerUri];
    const nonFungibleUkraine = await deploy(NonFungibleUkraineName, {
        from: deployer,
        args,
        log: true,
        waitConfirmations: currentNetwork.verificationBlockConfirmation,
    });

    if (!isDevemopmentChain && process.env.ETHERSCAN_API_KEY) {
        await verify(nonFungibleUkraine.address, args);
    }

    console.log(`${NonFungibleUkraineName} is deployed at ${nonFungibleUkraine.address}`);

    saveDeployOutput(NonFungibleUkraineName, chainId.toString(), nonFungibleUkraine);
};

export default deploy;
deploy.tags = ["all", "nonFungibleUkraine"];
