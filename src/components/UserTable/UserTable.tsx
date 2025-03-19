import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DeleteUserModal } from "../DeleteUserModal/DeleteUserModal";

interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  status: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onClickDelete = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const visibleUsers = users
    .filter((user) => user.status)
    .slice(page * 50, page * 50 + 50);

  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        status: true,
      },
    ]);
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <HeaderTable />
            <TableBody>
              {visibleUsers.map((user) => (
                <>
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>ojito</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={onClickDelete}
                      >
                        X
                      </Button>
                    </TableCell>
                  </TableRow>
                  <DeleteUserModal
                    id={user.id}
                    openModal={openModal}
                    onClose={onCloseModal}
                  />
                </>
              ))}
            </TableBody>
            <TablePagination
              component="div"
              count={users.length}
              rowsPerPage={50}
              onPageChange={handleChangePage}
              page={page}
            />
          </TableHead>
        </Table>
      </TableContainer>
    </Box>
  );
}

const HeaderTable = () => {
  const headers = ["Nombre", "Apellido", "Email", "Ver/Editar", "Dar de baja"];
  return (
    <TableRow>
      {headers.map((header) => (
        <TableCell>{header}</TableCell>
      ))}
    </TableRow>
  );
};
