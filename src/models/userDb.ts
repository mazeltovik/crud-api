import { validate as isValidUUID, v4 as uuidv4 } from 'uuid';
import {User,IUserDB} from '../types/types'

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
}

const db = new UserDB();
export default db
