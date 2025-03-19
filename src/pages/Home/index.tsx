import { Box, Button } from "@mui/material";
import UserTable from "../../components/UserTable/UserTable";
import { useState } from "react";
import { AddUserDialog } from "../../components/AddUserDialog/AddUserDialog";

export const Home = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const onOpenNewUserDialog = () => {
    setOpenNewUserDialog(true);
  };
  const onCloseNewUserDialog = () => {
    setOpenNewUserDialog(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h1>Usuarios registrados</h1>
      <Button variant="contained" onClick={onOpenNewUserDialog}>
        Agregar usuario
      </Button>
      <UserTable />
      <AddUserDialog
        openDialog={openNewUserDialog}
        onCloseDialog={onCloseNewUserDialog}
      />
    </Box>
  );
};
