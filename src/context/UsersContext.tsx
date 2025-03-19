import { useState, ReactNode } from "react";
import { UserContext } from "./UserContext";

export interface IUser {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  job_title: string;
  document: string;
  salary: number;
  dniPdf: string;
  licensePdf: string;
  cvPdf: string;
  status?: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      name: "asd",
      lastName: "asd",
      email: "asd",
      password: "asd",
      job_title: "as",
      document: "asd",
      salary: 0,
      dniPdf: "as",
      licensePdf: "asd",
      cvPdf: "asd",
      status: true,
    },
  ]);

  const updateUser = (updatedUser: IUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
