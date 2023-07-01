import { validate as isValidUUID, v4 as uuidv4 } from 'uuid';
import {User,IUserDB} from '../types/types'
import checkPostBody from '../helpers/checkPostBody';

class UserDB implements IUserDB{
    users: User[];
    constructor(){
        this.users = [{
            id: uuidv4(),
            username:'Nikita',
            age:28,
            hobbies:['games']
        }];
    }
    getAll(){
        return this.users;
    }
    getUserById(id:string){
        if(isValidUUID(id)){
            return this.users.find(user=>user.id === id)
        }
        return {id:null,status:400,data:'userID is not valid'}
    }
    createUser(newUser: User) {
        let keysOfNewUser = Object.keys(newUser);
        let requiredFlag = false;
        let typeFlag = false;
        if(keysOfNewUser.length == 3){
            requiredFlag = keysOfNewUser.every(v=>v=='username' || v=='age' || v=='hobbies')
        } 
        if(requiredFlag){
            typeFlag = checkPostBody(newUser);
        }
        if(requiredFlag && typeFlag){
            let successUser = {
                id:uuidv4(),
                ...newUser
            }
            this.users.push(successUser);
            return successUser;
        }
        return {status:400,data:'request body does not contain required fields'}
    }
}

const db = new UserDB();
export default db
