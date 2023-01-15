import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { StorageFilePath } from "../../../nfu-ukr-common/constants";
import { StorageToken } from "../../../nfu-ukr-common/contracts";

export default function hadler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "GET") {
        response.status(404).send(`Unexpected http method: ${request.method}`);
        return;
    }

    try {
        const readStream = fs.readFileSync("../" + StorageFilePath);
        const tokens: StorageToken[] = JSON.parse(readStream.toString());

        const result = tokens.filter((token) => token.isListed);
        response.status(200).json(result);
    } catch (exception) {
        console.log(exception);
        response.status(500).send("Request failed. View server logs for more details.");
    }
}
