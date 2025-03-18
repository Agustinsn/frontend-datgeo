import { Pagination } from "@mui/material";

export const Home = () => {
  return (
    <div>
      <h1>Usuarios registrados</h1>

      <Pagination count={10} color="primary" />
    </div>
  );
};
