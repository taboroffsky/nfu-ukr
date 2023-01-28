import { network } from "hardhat";

const setBalance = async function () {
    const address = "0x10c19247A4B4cA53D888623Eaf5244242bf55D6d";
    await network.provider.send("hardhat_setBalance", [address, "0x200000"]);
};

setBalance().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
