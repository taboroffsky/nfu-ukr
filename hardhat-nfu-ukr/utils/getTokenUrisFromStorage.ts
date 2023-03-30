import fs from "fs";
import { Token } from "../../nfu-ukr-common/contracts";

const getTokenUrisFromStorage: (filepath: string) => string[] = function (filepath) {
    const storage = fs.readFileSync(filepath).toString();
    const storageTokens: Token[] = JSON.parse(storage);
    return storageTokens.map((token) => token.tokenUri);
};

export default getTokenUrisFromStorage;
