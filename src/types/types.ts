export type User = {
    id?: string,
    username:string,
    age:number,
    hobbies:string[]
}

type InvalidOperation = {
    id?:null | number,
    status:number,
    data:string
}

export type message = {
    [key:string]:string
}

export type UserAndInvalidOperation = User | InvalidOperation

export interface IUserDB{
    getAll():User[],
    getUserById(id:string): UserAndInvalidOperation | undefined,
    createUser(newUser:User): UserAndInvalidOperation,
    updateUser(id:string,body:User): UserAndInvalidOperation,
    deleteUser(id:string): InvalidOperation | undefined
}
