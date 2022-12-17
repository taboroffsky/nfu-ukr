import pinataSDK from "@pinata/sdk";
import path from "path";
import fs from "fs";

const pinataApiKey = process.env.PINATA_API_KEY!;
const pinataApiSecret = process.env.PINATA_API_SECRET!;
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

const pinJSONToPinata: (metadata: any) => Promise<string> = async function (metadata) {
    try {
        // add name to the json object
        const response = await pinata.pinJSONToIPFS(metadata);
        return response.IpfsHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const pinImagesToPinata: (imagesFilePath: string) => Promise<{ uris: string[]; files: string[] }> = async function (imagesFilePath) {
    console.log("loading images from files");
    const absolutePath = path.resolve(imagesFilePath);
    const files = fs.readdirSync(absolutePath);
    let uris: string[] = [];

    for (const file in files) {
        const readStream = fs.createReadStream(`${absolutePath}/${files[file]}`);

        try {
            console.log(`pinning file: => ${files[file]}`);
            const response = await pinata.pinFileToIPFS(readStream);
            console.log(`pin result: ${response}`);

            uris.push(response.IpfsHash);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { uris, files };
};

export { pinImagesToPinata, pinJSONToPinata };
