import { InputBasePropsSizeOverrides } from "@mui/material";

export const updateUser = async (id:number,user: InputBasePropsSizeOverrides) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}