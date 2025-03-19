import { createContext } from "react";
import { IUser } from "./UsersContext";

interface UserContextType {
    users: IUser[];
    updateUser: (updatedUser: IUser) => void;
    deleteUser: (id: number) => void;
  }

export const UserContext = createContext<UserContextType | undefined>(
    undefined
  );