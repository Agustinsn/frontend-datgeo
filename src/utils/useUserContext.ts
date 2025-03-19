import { useContext } from "react";
import { UserContext } from "../context/UserContext";

// Custom hook para acceder al contexto de usuarios
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de un UserProvider");
  }
  return context;
};
