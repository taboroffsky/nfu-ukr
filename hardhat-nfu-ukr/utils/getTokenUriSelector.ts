
import { ethers } from "ethers";
import { toUtf8Bytes } from "ethers/lib/utils";

const getTokenUriSelector: (tokenUri: string) => string = function (tokenUri) {
    const hashedUri = ethers.utils.keccak256(toUtf8Bytes(tokenUri));
    return ethers.utils.solidityPack(["bytes"], [hashedUri]).slice(0, 10);
};

export default getTokenUriSelector;
