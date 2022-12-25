import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

import { CollectionFilePath } from '../../../public/constants';
import type Token from '../../../../nfu-ukr-common/contracts';


export default function hadler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== "POST"){
        response.status(404).statusMessage = `Unexpected http method: ${request.method}}`;
        return;
    }

    try {
        // get file
        const collection: Token[] = JSON.parse(fs.readFileSync(CollectionFilePath).toString());
        
        // update file
        
        response.status(200).json({});
    }
    catch (exception){
        // log to file
        response.status(500).statusMessage = "Request failed. View server logs for more details.";
    }
}