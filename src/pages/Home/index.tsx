import { Box } from "@mui/material";
import UserTable from "../../components/UserTable/UserTable";

export const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <h1>Usuarios registrados</h1>
      <UserTable />
    </Box>
  );
};
