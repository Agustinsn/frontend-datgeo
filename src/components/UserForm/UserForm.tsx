import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UploadFileSection } from "../UploadFileSection/UploadFileSection";
import { IJobType, IUser } from "../../context/UsersContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../utils/useUserContext";
import { getUserContex } from "../../utils/getUserContex";
import { blueGrey } from "@mui/material/colors";
import { addUser } from "../../services/addUser.service";
import { getJobs } from "../../services/getJobs.service";
import { updateUser } from "../../services/updateUser.service";

interface IUserFormProps {
  idUser?: number;
  mode: "add" | "edit" | "view";
}

const baseFormData = {
  name: "",
  last_name: "",
  email: "",
  password: "",
  job_type: { id: 0, name: "" },
  dni: "",
  salary: 0,
  document_dni: { id: null, name: "", path: "", is_active: false },
  document_license: { id: null, name: "", path: "", is_active: false },
  document_cv: { id: null, name: "", path: "", is_active: false },
};

export const UserForm = ({ idUser, mode }: IUserFormProps) => {
  const [formData, setFormData] = useState<IUser>(baseFormData);
  const [jobs, setJobs] = useState<IJobType[]>([]);
  const { users, addUserContext, onEditedUser } = useUserContext();
  const navigate = useNavigate();
  const disabledBtn = false;
  const btnText = mode === "add" ? "Agregar usuario" : "Editar usuario";

  const onChangeField =
    (field: keyof IUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
      // updateUser({ ...formData, [field]: event.target.value });
    };
  const onUploadFile = (url: string, type: "dni" | "license" | "cv") => {
    setFormData({ ...formData, [`document_${type}`]: url });
  };

  const onSubmit = () => {
    if (mode === "add") {
      addUser(formData);
      addUserContext(formData);
      onEditedUser("Usuario agregado correctamente");
    }
    if (mode === "edit" && idUser) {
      updateUser(idUser, formData);
      onEditedUser("Usuario editado correctamente");
    }
  };

  const onChangeSelect = (event: SelectChangeEvent<number>) => {
    setFormData({
      ...formData,
      job_type: { id: event.target.value as number, name: "" },
    });
  };

  useEffect(() => {
    if (idUser && (mode === "edit" || mode === "view")) {
      const user = getUserContex({ users, idUser });
      if (user) setFormData(user);
    }
  }, [idUser, users, navigate, mode]);

  useEffect(() => {
    async function getJobsData() {
      await getJobs().then((jobs) => {
        setJobs(jobs);
      });
    }

    getJobsData();
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      component="form"
      autoComplete="off"
      width={500}
      onSubmit={onSubmit}
      bgcolor={"#f5f5f5"}
      border={"solid 1px black"}
      paddingBottom={3}
    >
      {mode === "add" && (
        <Typography
          variant="h4"
          bgcolor={blueGrey[600]}
          textAlign={"center"}
          fontWeight={"bold"}
          padding={1}
          color="white"
        >
          Agregar usuario
        </Typography>
      )}
      <Grid2 container spacing={2} padding={2} paddingBottom={0}>
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
            id="last_name"
            label="Apellido"
            value={formData.last_name}
            onChange={onChangeField("last_name")}
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
            required={mode === "add"}
            id="password"
            type={mode === "view" ? "password" : "text"}
            label="Contraseña"
            value={formData.password}
            onChange={onChangeField("password")}
            disabled={mode === "view"}
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControl fullWidth>
            <InputLabel id="jobTypeSelect">Puesto</InputLabel>
            <Select
              labelId="jobTypeSelect"
              id="job_type"
              value={formData.job_type?.id}
              defaultValue={0}
              label="Puesto"
              onChange={onChangeSelect}
              disabled={mode === "view"}
              required
            >
              {jobs.map((job: IJobType) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="document"
            label="DNI"
            value={formData.dni}
            onChange={onChangeField("dni")}
            disabled={mode === "view"}
            required
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

      <UploadFileSection
        mode={mode}
        type={"dni"}
        onUploadFile={onUploadFile}
        document={formData.document_dni}
      />
      <UploadFileSection
        mode={mode}
        type={"cv"}
        onUploadFile={onUploadFile}
        document={formData.document_cv}
      />
      <UploadFileSection
        mode={mode}
        type={"license"}
        onUploadFile={onUploadFile}
        document={formData.document_license}
      />

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
