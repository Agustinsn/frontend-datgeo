import { createContext } from "react";
import { IUser } from "./UsersContext";

interface UserContextType {
    users: IUser[];
    editedUser: boolean;
    editedMessage: string;
    addUserContext: (newUser: IUser) => void;
    updateUserContext: (updatedUser: IUser) => void;
    deleteUserContext: (id: number) => void;
    onEditedUser: (message: string) => void;
    clear: () => void;
  }

export const UserContext = createContext<UserContextType | undefined>(
    undefined
  );