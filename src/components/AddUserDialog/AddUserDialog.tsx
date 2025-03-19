import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { UserForm } from "../UserForm/UserForm";
interface IAddUserDialog {
  openDialog: boolean;
  onCloseDialog: () => void;
}

export const AddUserDialog = ({
  openDialog,
  onCloseDialog,
}: IAddUserDialog) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    onCloseDialog();
  };

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <UserForm />
    </Dialog>
  );
};
