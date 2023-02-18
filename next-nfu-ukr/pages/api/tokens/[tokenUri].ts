import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { StorageFilePath } from "../../../../nfu-ukr-common/constants";
import { StorageToken } from "../../../../nfu-ukr-common/contracts";

export default function hadler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "PUT") {
        response.status(404).send(`Unexpected http method: ${request.method}`);
        return;
    }

    try {
        const { tokenUri } = request.query;

        const readStream = fs.readFileSync("../" + StorageFilePath);
        const tokens: StorageToken[] = JSON.parse(readStream.toString());

        const token = tokens.find((token) => token.tokenUri == tokenUri);
        token!.isListed = false;

        fs.writeFileSync("../" + StorageFilePath, JSON.stringify(tokens, null, 2));
        response.status(200).json(token);
    } catch (exception) {
        console.log(`Request failed. \nRequest: ${request}\nException: ${exception}`);
        response.status(500).send("Request failed. View server logs for more details.");
    }
}
