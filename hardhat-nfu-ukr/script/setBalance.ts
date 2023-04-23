import { ethers, network } from "hardhat";

const setBalance = async function () {
    const address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
    const balance = "0x1bc16d674ec80000"; // 2 ETH
    await network.provider.send("hardhat_setBalance", [address, balance]);
    console.log(`balance of ${address} is set to ${ethers.utils.formatEther(parseInt(balance, 16).toString())}`);
};

setBalance().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
