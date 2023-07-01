import { IncomingMessage, ServerResponse } from "http";
import { UserAndInvalidOperation } from "../types/types";

export default function postNewUserCntrl(res:ServerResponse<IncomingMessage>, data:UserAndInvalidOperation){
    if(data && data.id){
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end(); 
    }
}