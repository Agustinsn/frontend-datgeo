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
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

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
      {
        id: 2,
        name: "Jane",
        lastName: "Doe",
        email: "",
        status: true,
      },
    ]);
  }, []);

  return (
    <Box px={2} overflow={"hidden"} width={"70%"} alignSelf={"center"}>
      <TableContainer sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <HeaderTable />
          <TableBody>
            {visibleUsers.map((user) => (
              <>
                <TableRow key={user.id}>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onClickDelete}
                    >
                      <ManageAccountsOutlinedIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={onClickDelete}
                    >
                      <PersonRemoveOutlinedIcon />
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
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        rowsPerPage={50}
        onPageChange={handleChangePage}
        page={page}
      />
    </Box>
  );
}

const HeaderTable = () => {
  const columns = [
    { id: "name", label: "Nombre", width: 100 },
    { id: "lastName", label: "Apellido", width: 100 },
    {
      id: "email",
      label: "Correo",
      width: 170,
    },
    {
      id: "action",
      label: "Ver/editar",
      width: 170,
    },
    {
      id: "delete",
      label: "Dar de baja",
      width: 170,
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            style={{ width: column.width, fontWeight: "bold" }}
            align="center"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
