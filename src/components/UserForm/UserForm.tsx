import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { UploadFileSection } from "../UploadFileSection/UploadFileSection";

interface IUser {
  name: string;
  lastName: string;
  email: string;
  password: string;
  job_title: string;
  document: string;
  salary: string;
}

export const UserForm = () => {
  const [user, setUser] = useState<IUser>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    job_title: "",
    document: "",
    salary: "",
  });
  const disabledBtn = Object.values(user).some((value) => value === "");

  const onChangeField =
    (field: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: event.target.value });
    };
  const onSubmit = () => {
    console.log("submit");
    console.log(user);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      component="form"
      autoComplete="off"
      padding={2}
      width={500}
      onSubmit={onSubmit}
    >
      <Typography variant="h5" alignSelf={"center"}>
        Agregar usuario
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField
            required
            id="name"
            label="Nombre"
            onChange={onChangeField("name")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="lastName"
            label="Apellido"
            onChange={onChangeField("lastName")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="email"
            label="Correo"
            onChange={onChangeField("email")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="password"
            label="Contraseña"
            onChange={onChangeField("password")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="job_title"
            label="Puesto"
            onChange={onChangeField("job_title")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="document"
            label="DNI"
            onChange={onChangeField("document")}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="salary"
            label="Salario"
            onChange={onChangeField("salary")}
          />
        </Grid2>
        <Grid2 size={8}></Grid2>
      </Grid2>
      <UploadFileSection type={"dni"} />
      <UploadFileSection type={"licencia"} />
      <UploadFileSection type={"cv"} />
      <Button
        variant="contained"
        type="submit"
        sx={{ width: 200, alignSelf: "center" }}
        disabled={disabledBtn}
      >
        Agregar usuario
      </Button>
    </Box>
  );
};
