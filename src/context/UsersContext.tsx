import { useState, ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getUsers } from "../services/getUsers.service";

export interface IJobType {
  id: number;
  name: string;
}

export interface Idocument {
  id: number | null;
  name: string;
  path: string;
  is_active: boolean;
}

export interface IUser {
  id?: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  job_type: IJobType;
  dni: string;
  salary: number;
  document_dni: Idocument;
  document_license: Idocument;
  document_cv: Idocument;
  is_active?: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editedUser, setEditedUser] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");

  const addUserContext = (newUser: IUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const updateUserContext = (updatedUser: IUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUserContext = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const onEditedUser = (message: string) => {
    setEditedUser(true);
    setEditedMessage(message);
  };

  const clear = () => {
    setEditedUser(false);
    setEditedMessage("");
  };

  useEffect(() => {
    const getData = async () => {
      const users: IUser[] = await getUsers();
      setUsers(users);
    };

    getData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        editedUser,
        editedMessage,
        addUserContext,
        updateUserContext,
        deleteUserContext,
        onEditedUser,
        clear,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
