import { useState } from "react";
import { Box, Button } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import UserTable from "../../components/UserTable/UserTable";
import { AddUserDialog } from "../../components/AddUserDialog/AddUserDialog";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

export const Home = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const onOpenNewUserDialog = () => {
    setOpenNewUserDialog(true);
  };
  const onCloseNewUserDialog = () => {
    setOpenNewUserDialog(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      textAlign={"center"}
      sx={{ padding: 2 }}
    >
      <Box
        bgcolor={blueGrey[800]}
        color={"white"}
        padding={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <h1>Usuarios registrados</h1>
        <Button
          variant="contained"
          onClick={onOpenNewUserDialog}
          sx={{ widht: 200, height: 50 }}
          startIcon={<PersonAddAltOutlinedIcon />}
        >
          Agregar usuario
        </Button>
      </Box>
      <UserTable />
      <AddUserDialog
        openDialog={openNewUserDialog}
        onCloseDialog={onCloseNewUserDialog}
      />
    </Box>
  );
};
