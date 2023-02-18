import { StorageToken } from "../../nfu-ukr-common/contracts";
import fs from "fs";

const getTokenUrisFromStorage: (filepath: string) => string[] = function (filepath) {
    const storage = fs.readFileSync(filepath).toString();
    const storageTokens: StorageToken[] = JSON.parse(storage);
    const tokenUris: string[] = storageTokens.map((token) => token.tokenUri);
    return tokenUris;
};

export default getTokenUrisFromStorage;
