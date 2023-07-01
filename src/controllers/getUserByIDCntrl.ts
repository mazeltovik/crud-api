import { IncomingMessage, ServerResponse } from "http";
import { UserAndInvalidUUID } from "../types/types";

export default function getUserByIDCntrl(res:ServerResponse<IncomingMessage>, data:UserAndInvalidUUID|undefined){
    if(data && data.id){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
    } else if(data && !data.id){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({data:'User not found'}));
        res.end(); 
    }
}