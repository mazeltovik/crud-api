export type User = {
    id?: string,
    username:string,
    age:number,
    hobbies:string[]
}

type InvalidOperation = {
    id?:null,
    status:number,
    data:string
}


export type UserAndInvalidOperation = User | InvalidOperation

export interface IUserDB{
    getAll():User[],
    getUserById(id:string): UserAndInvalidOperation | undefined,
    createUser(newUser:User): UserAndInvalidOperation
}
