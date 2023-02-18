import pinataSDK from "@pinata/sdk";
import fs from "fs";
import path from "path";
import { StorageFilePath } from "../../nfu-ukr-common/constants";
import { StorageToken, TokenMetadata } from "../../nfu-ukr-common/contracts";
import getTokenUrisFromStorage from "../utils/getTokenUrisFromStorage";

const pinataApiKey = process.env.PINATA_API_KEY!;
const pinataApiSecret = process.env.PINATA_API_SECRET!;
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);
const IpfsSchema: string = "ipfs://";
const RootFilePath: string = "input";
const ImageExtension: string = ".png";
const EnglishDescriptionExtension: string = ".eng.txt";
const UnrainianDescrptionExtension: string = ".ua.txt";

const uploadTokensToPinata: () => Promise<void> = async function () {
    const absolutePath = path.resolve(RootFilePath);
    const absolutePathPrefix = absolutePath + "/";
    const imagesFilepaths = fs.readdirSync(absolutePath).filter((fileName) => fileName.endsWith(ImageExtension));

    // We expect to have at least empty Storage file.
    const storage = fs.readFileSync("../" + StorageFilePath).toString();
    const storageTokens: StorageToken[] = JSON.parse(storage);

    for (const index in imagesFilepaths) {
        const imageFilepath = imagesFilepaths[index];

        if (storageTokens.filter((token) => imageFilepath.startsWith(token.name)).length > 0) {
            console.log(`Skipping upload of ${imageFilepath}`);
            continue;
        }

        const imageUri = await pinImageToPinata(absolutePathPrefix + imageFilepath);
        const imageEnglishDescription = fs.readFileSync(absolutePathPrefix + imageFilepath.replace(ImageExtension, EnglishDescriptionExtension));
        const imageUkrainianDescription = fs.readFileSync(absolutePathPrefix + imageFilepath.replace(ImageExtension, UnrainianDescrptionExtension));

        const metadata: TokenMetadata = {
            name: imageFilepath.replace(ImageExtension, ""),
            description: imageEnglishDescription.toString(),
            image: IpfsSchema + imageUri,
        };

        const tokenUri = await pinJSONToPinata(metadata);

        const storageToken: StorageToken = {
            ...metadata,
            tokenUri: IpfsSchema + tokenUri,
            descriptionUa: imageUkrainianDescription.toString(),
            isListed: true,
        };

        storageTokens.push(storageToken);
    }

    fs.writeFileSync("../" + StorageFilePath, JSON.stringify(storageTokens, null, 2));
};

const pinImageToPinata: (imagesFilePath: string) => Promise<string> = async function (imagesFilePath) {
    const readStream = fs.createReadStream(imagesFilePath);

    try {
        console.log(`pinning file to IPFS => ${imagesFilePath}`);
        //const response = { IpfsHash: "ipfs://image" };
        const response = await pinata.pinFileToIPFS(readStream);
        console.log(`pin result: ${JSON.stringify(response)}`);

        return response.IpfsHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const pinJSONToPinata: (metadata: TokenMetadata) => Promise<string> = async function (metadata) {
    try {
        console.log(`pinning token to IPFS => ${metadata.name}`);
        const response = await pinata.pinJSONToIPFS(metadata, { pinataMetadata: { name: metadata.name } });
        //const response = { IpfsHash: "ipfs://tokenMetadata" };
        console.log(`pin result: ${JSON.stringify(response)}`);

        return response.IpfsHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

uploadTokensToPinata().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
