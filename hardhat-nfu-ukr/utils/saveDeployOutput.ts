import { DeployResult } from "hardhat-deploy/dist/types";
import { ContractAbi, ContractAddress } from "../../nfu-ukr-common/contracts";
import { ContractAbiFilePath, ContractAddressFilePath } from "../../nfu-ukr-common/constants";
import * as fs from "fs";

const saveDeployOutput: (contractName: string, chainId: string, deployResult: DeployResult) => void = function (contractName, chainId, deployResult) {
    const contractAddressAbsoluteFilePath = "../" + ContractAddressFilePath;
    const contractAbiAbsoluteFilePath = "../" + ContractAbiFilePath;

    const contractAddress: ContractAddress = JSON.parse(fs.readFileSync(contractAddressAbsoluteFilePath).toString());
    contractAddress[chainId] = contractAddress[chainId] ?? {};
    contractAddress[chainId][contractName] = deployResult.address;
    fs.writeFileSync(contractAddressAbsoluteFilePath, JSON.stringify(contractAddress, null, 2));

    const contractAbi: ContractAbi = JSON.parse(fs.readFileSync(contractAbiAbsoluteFilePath).toString());
    contractAbi[contractName] = JSON.stringify(deployResult.abi);
    fs.writeFileSync(contractAbiAbsoluteFilePath, JSON.stringify(contractAbi, null, 2));
};

export default saveDeployOutput;
