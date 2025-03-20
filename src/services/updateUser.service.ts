import { InputBasePropsSizeOverrides } from "@mui/material";

export const updateUser = async (id:number,user: InputBasePropsSizeOverrides) => {
  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}