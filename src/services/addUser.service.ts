import { IUser } from "../context/UsersContext";

export const addUser = async (user: IUser) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${API_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}