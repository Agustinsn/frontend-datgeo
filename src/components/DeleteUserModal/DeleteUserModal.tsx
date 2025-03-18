import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  return (
    <Modal open={open} onClose={handleClose}>
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
          <Button variant="contained" color="error">
            Eliminar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
