export type User = {
    id: string,
    username:string,
    age:number,
    hobbies:string[]
}

type InvalidUUID = {
    id:null,
    status:number,
    data:string
}


export type UserAndInvalidUUID = User | InvalidUUID 

export interface IUserDB{
    getAll():User[],
    getUserById(id:string): UserAndInvalidUUID | undefined
}
