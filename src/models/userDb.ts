import { validate as isValidUUID, v4 as uuidv4 } from 'uuid';
import { User,IUserDB } from '../types/types'
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
    updateUser(id:string,body:User){
        if(isValidUUID(id)){
            let user = this.users.find(user=>user.id === id)
            if(user){
                for(let key in body){
                    if( key == 'username' && typeof body[key] == 'string' ){
                        user.username = body.username;
                    } else if(key == 'age' && typeof body[key] == 'number'){
                        user.age = body.age;
                    } else if(key == 'hobbies' && Array.isArray(body[key])){
                        user.hobbies.push(...body[key]);
                    } else {
                        return {status: 404, data:'Not a required field'}
                    }
                }
                return user;
            } else return {status: 404, data:'User not found'}
        }
        return {id:null,status:400,data:'userID is not valid'}
    }
    deleteUser(id:string){
        if(isValidUUID(id)){
            let userIndex = this.users.findIndex((user)=>user.id === id);
            if(~userIndex){
                this.users.splice(userIndex,1);
                return {id:userIndex,status:204,data:'User was deleted'}
            }
            return undefined;
        }
        return {id:null,status:400,data:'userID is not valid'}
    }
}

const db = new UserDB();
export default db
