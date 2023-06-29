import { Poet } from '@/Types';
import {request} from '../../helpers';

import {NextApiRequest,NextApiResponse} from 'next';

export default async (req:NextApiRequest,res:NextApiResponse<any>) => {

    if (req.method === "GET"){
        const {url} = req.query;
        console.log("reqBody", req.body);

        const poets = await request<Poet[]>('https://api.ganjoor.net/api/ganjoor/poets');

        const requestedPoetId = poets.find(poet => poet.fullUrl === "/"+url)?.id;

        if (requestedPoetId){
            const poet = await request<any>(`https://api.ganjoor.net/api/ganjoor/poet/${requestedPoetId}`);
            res.status(200).json(poet);
        }else{
            res.status(400).json({message:"something went wrong"});
        }
        
    }else{
        res.status(400).json({message:"something went wrong"});
    }


}