import { IUser } from "../context/UsersContext";

export function getUserContex({users,idUser}:{users:IUser[],idUser:number}) {
    return users.find((u: IUser) => u.id === Number(idUser));
}