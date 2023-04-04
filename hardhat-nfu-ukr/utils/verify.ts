import { run } from "hardhat";

const verify = async (contractAddress: string, args: any[]) => {
    console.log(`Verifying ${contractAddress}`);
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
        console.log(`Verified ${contractAddress} !`);
    } catch (error: any) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(error);
        }
    }
};

export default verify;
