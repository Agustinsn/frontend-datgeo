import { IUser } from "../context/UsersContext";

export const addUser = async (user: IUser) => {
  const response = await fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}