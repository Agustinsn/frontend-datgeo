import { IUser } from "../context/UsersContext";

export const verifyFields = (user:IUser) =>{
    const {name,last_name,email,password,job_type,dni,salary} = user
    return (!name||!last_name||!email||!password||!job_type||!dni||!salary)
}