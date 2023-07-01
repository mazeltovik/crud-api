import { IncomingMessage, ServerResponse } from "http";
import { User } from "../types/types";

export default function getAllUsersCntrl(res:ServerResponse<IncomingMessage>, data:User[]){
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(data));
    res.end();
}