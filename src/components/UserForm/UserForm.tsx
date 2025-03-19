import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadFileSection } from "../UploadFileSection/UploadFileSection";
import { IUser } from "../../context/UsersContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils/useUserContext";
import { getUserContex } from "../../utils/getUserContex";

interface IUserFormProps {
  idUser?: number;
  mode: "add" | "edit" | "view";
}

const baseFormData = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  job_title: "",
  document: "",
  salary: 0,
  dniPdf: "",
  licensePdf: "",
  cvPdf: "",
};

export const UserForm = ({ idUser, mode }: IUserFormProps) => {
  const context = useUserContext();
  const navigate = useNavigate();
  const { users } = context;
  const [formData, setFormData] = useState<IUser>(baseFormData);
  const disabledBtn = Object.values(formData).some((value) => value === "");
  const btnText = mode === "add" ? "Agregar usuario" : "Editar usuario";

  useEffect(() => {
    if (idUser && (mode === "edit" || mode === "view")) {
      const user = getUserContex({ users, idUser });
      if (user) setFormData(user);
      else navigate("/");
    }
  }, [idUser, users, navigate, mode]);

  const onChangeField =
    (field: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
      // updateUser({ ...formData, [field]: event.target.value });
    };
  const onSubmit = () => {
    console.log("submit");
    console.log(formData);
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
      {mode === "add" && (
        <Typography variant="h4" textAlign={"center"}>
          Agregar usuario
        </Typography>
      )}
      <Grid2 container spacing={2} bgcolor={"#f5f5f5"} padding={2}>
        <Grid2 size={6}>
          <TextField
            required
            id="name"
            label="Nombre"
            value={formData.name}
            onChange={onChangeField("name")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="lastName"
            label="Apellido"
            value={formData.lastName}
            onChange={onChangeField("lastName")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="email"
            label="Correo"
            value={formData.email}
            onChange={onChangeField("email")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="password"
            label="Contraseña"
            value={formData.password}
            onChange={onChangeField("password")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="job_title"
            label="Puesto"
            value={formData.job_title}
            onChange={onChangeField("job_title")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="document"
            label="DNI"
            value={formData.document}
            onChange={onChangeField("document")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            required
            id="salary"
            label="Salario"
            value={formData.salary}
            onChange={onChangeField("salary")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={8}></Grid2>
      </Grid2>
      {mode !== "view" ? (
        <UploadFileSection type={"dni"} />
      ) : (
        <TextField
          value={formData.dniPdf}
          variant="outlined"
          placeholder="Ningún archivo seleccionado"
          aria-readonly
          fullWidth
        />
      )}
      {mode !== "view" ? (
        <UploadFileSection type={"cv"} />
      ) : (
        <TextField
          value={formData.cvPdf}
          variant="outlined"
          placeholder="Ningún archivo seleccionado"
          aria-readonly
          fullWidth
        />
      )}
      {mode !== "view" ? (
        <UploadFileSection type={"licencia"} />
      ) : (
        <TextField
          value={formData.licensePdf}
          variant="outlined"
          placeholder="Ningún archivo seleccionado"
          aria-readonly
          fullWidth
        />
      )}
      {mode !== "view" && (
        <Button
          variant="contained"
          type="submit"
          sx={{ width: 200, alignSelf: "center" }}
          disabled={disabledBtn}
        >
          {btnText}
        </Button>
      )}
    </Box>
  );
};
