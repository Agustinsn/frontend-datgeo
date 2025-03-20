import { IUser } from "../context/UsersContext";

export const addUser = async (user: IUser) => {
  const response = await fetch(`/api/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}