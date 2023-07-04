import { User } from "../types/types";

export default function checkPostBody(body:User){
    for(let key in body){
        if(key == 'username' && typeof body[key] != 'string') return false;
        if(key == 'age' && typeof body[key] != 'number') return false;
        if(key == 'hobbies' && !Array.isArray(body[key])) return false
    }
    return true;
}