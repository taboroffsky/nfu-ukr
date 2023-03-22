import fs from "fs";
import path from "path";
import pinataSDK, { PinataClient } from "@pinata/sdk";
import { load as loadEnvironment } from "ts-dotenv";
import { execFile } from "node:child_process";
import { StorageFilePath } from "../constants";
import { Token, TokenMetadata } from "../contracts";

interface ImageMetadata {
    filePath: string;
    nameUa: string;
    descriptionUa: string;
    descriptionEn: string;
}

interface ImagesMetadataCollection {
    [key: string]: ImageMetadata;
}

const env = loadEnvironment({
    PINATA_API_KEY: String,
    PINATA_API_SECRET: String,
});

const pinata: PinataClient = pinataSDK(env.PINATA_API_KEY, env.PINATA_API_SECRET);

const descriptionSuffix: string = "_description";
const nameSuffix: string = "_name";
const imageExtension: string = ".png";
const metadataExtension: string = ".metadata.txt";
const IpfsSchema: string = "ipfs://";

// Following constants are based on the current files strucure.
// File paths should be injected via parameters to make script more reliable and independent.
const enLocaleFilePath: string = "../next-nfu-ukr/locales/en/tokens.json";
const uaLocaleFilePath: string = "../next-nfu-ukr/locales/ua/tokens.json";
const tokensImagesFolderFilePath: string = "../next-nfu-ukr/public/tokens";
const inputFolderFilePath: string = "../../input";

// add readme to install typescript and ts-node globally before running.
const seedCollectionData = async function () {
    // load existing storage
    const storage = fs.readFileSync("../" + StorageFilePath).toString();
    const storageTokens: Token[] = JSON.parse(storage);

    // load existing locales
    const enLocales = JSON.parse(fs.readFileSync(enLocaleFilePath).toString());
    const uaLocales = JSON.parse(fs.readFileSync(uaLocaleFilePath).toString());

    // prepare input images
    const absolutePath = path.resolve(inputFolderFilePath);
    const imagesFilepaths = fs.readdirSync(absolutePath).filter((fileName) => fileName.endsWith(imageExtension));

    // validate input metadata
    const imagesMetadata: ImagesMetadataCollection = {};
    imagesFilepaths.forEach((imageFilePath) => {
        const imageName = imageFilePath.replace(imageExtension, "");
        const imageRawMetadata = fs
            .readFileSync(path.join(absolutePath, imageFilePath.replace(imageExtension, metadataExtension)))
            .toString()
            .split("\r\n");

        if (imageRawMetadata.length !== 3) {
            throw `Unexpected format of metadata for image ${imageFilePath}`;
        }

        imagesMetadata[imageName] = {
            filePath: imageFilePath,
            nameUa: imageRawMetadata[0],
            descriptionUa: imageRawMetadata[1],
            descriptionEn: imageRawMetadata[2],
        };
    });

    // uploading images to Pinata
    for (const imageName in imagesMetadata) {
        if (storageTokens.some((token) => token.name === imageName)) {
            console.log(`Skipping upload of ${imageName}`);
            continue;
        }

        const absoluteImageFilePath = path.join(inputFolderFilePath, imagesMetadata[imageName].filePath);
        const imageUri = await pinImageToPinata(absoluteImageFilePath);

        const tokenMetadata: TokenMetadata = {
            name: imageName,
            description: imagesMetadata[imageName].descriptionEn,
            image: IpfsSchema + imageUri,
        };

        const tokenUri = await pinJSONToPinata(tokenMetadata);
        const storageToken: Token = {
            name: imageName,
            tokenUri: IpfsSchema + tokenUri,
        };

        storageTokens.push(storageToken);
    }

    // update storage, save token locales, copy image to public resources folder
    for (const imageName in imagesMetadata) {
        const imageMetadata = imagesMetadata[imageName];
        enLocales[imageName + nameSuffix] = imageName;
        enLocales[imageName + descriptionSuffix] = imageMetadata.descriptionEn;
        uaLocales[imageName + nameSuffix] = imageMetadata.nameUa;
        uaLocales[imageName + descriptionSuffix] = imageMetadata.descriptionUa;

        const fromFilePath = path.join(inputFolderFilePath, imagesMetadata[imageName].filePath);
        const toFilePath = path.join(tokensImagesFolderFilePath, imagesMetadata[imageName].filePath);
        compressImage(fromFilePath, toFilePath);
    }

    fs.writeFileSync("../" + StorageFilePath, JSON.stringify(storageTokens, null, 2));
    fs.writeFileSync(enLocaleFilePath, JSON.stringify(enLocales, null, 2));
    fs.writeFileSync(uaLocaleFilePath, JSON.stringify(uaLocales, null, 2));
};

const pinImageToPinata: (imagesFilePath: string) => Promise<string> = async function (imagesFilePath) {
    const readStream = fs.createReadStream(imagesFilePath);

    try {
        console.log(`pinning file to IPFS => ${imagesFilePath}`);
        const response = { IpfsHash: "ipfs://image" };
        //const response = await pinata.pinFileToIPFS(readStream);
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
        const response = { IpfsHash: "ipfs://tokenMetadata" };
        //const response = await pinata.pinJSONToIPFS(metadata, { pinataMetadata: { name: metadata.name } });
        console.log(`pin result: ${JSON.stringify(response)}`);

        return response.IpfsHash;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const  compressImage: (inputFilePath: string, outputFilePath: string) => void = function(inputFilePath, outputFilePath){
    execFile("pngquant", ["--quality", "1", "-o", outputFilePath, inputFilePath], (error: any) => {
        if (error) {
            console.error(error);
        }
    });
}

seedCollectionData().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
