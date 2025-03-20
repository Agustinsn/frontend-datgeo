import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteUser } from "../../services/deleteUser.service";
import { useUserContext } from "../../utils/useUserContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IDeleteUserModal {
  id: number;
  openModal: boolean;
  onClose: () => void;
}

export const DeleteUserModal = ({
  id,
  openModal,
  onClose,
}: IDeleteUserModal) => {
  const [open, setOpen] = useState(false);
  const { deleteUserContext, onEditedUser } = useUserContext();
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const onSubmit = async () => {
    const response = await deleteUser(id);

    if (response.ok) {
      deleteUserContext(id);
      onEditedUser("Usuario eliminado correctamente");
      onClose();
    } else {
      onEditedUser("Error al eliminar el usuario");
      onClose();
    }
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Box sx={style}>
          <Typography>
            ¿Estás seguro que quieres eliminar el usuario con id {id}?
          </Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ marginTop: 2, justifyContent: "center" }}
          >
            <Button onClick={handleClose} variant="contained">
              Cancelar
            </Button>
            <Button onClick={onSubmit} variant="contained" color="error">
              Eliminar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
