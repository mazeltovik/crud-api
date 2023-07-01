import { IncomingMessage, ServerResponse } from "http";
import { UserAndInvalidOperation } from "../types/types";

export default function deleteUserCntrl(res:ServerResponse<IncomingMessage>, data:UserAndInvalidOperation|undefined){
    if(data && data.id){
        res.writeHead(204, {'Content-Type': 'application/json'});
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