import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadFile } from "../../services/uploadFile.service";
import { Idocument } from "../../context/UsersContext";
import { CloudDownload } from "@mui/icons-material";
import { getFile } from "../../services/getFile.service";

interface IUploadFileSection {
  mode: "view" | "edit" | "add";
  type: "dni" | "license" | "cv";
  onUploadFile: (url: string, type: "dni" | "license" | "cv") => void;
  document: Idocument;
}

export const UploadFileSection = ({
  mode,
  type,
  onUploadFile,
  document,
}: IUploadFileSection) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await uploadFile(event.target.files![0], type).then((id) => {
      if (id) {
        onUploadFile(id, type);
        setFileName(event.target.files![0].name);
      }
    });
  };

  if (mode === "view") {
    return <FileSection name={document?.name} type={type} />;
  }

  return (
    <Box component="form" paddingX={2}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        id={type}
        style={{ display: "none" }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <label htmlFor={type} style={{ width: "80%" }}>
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Subir {type}
          </Button>
        </label>
        <TextField
          value={document?.name ?? fileName}
          variant="outlined"
          placeholder="Ningún archivo seleccionado"
          aria-readonly
          fullWidth
        />
      </Box>
    </Box>
  );
};

const FileSection = ({
  name,
  type,
}: {
  name: string;
  type: "dni" | "license" | "cv";
}) => {
  const onDownloadFile = async () => {
    if (!name) return;
    const blob = await getFile(name);
    if (!blob) {
      console.error("Error al descargar el PDF");
      return;
    }
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box display={"flex"}>
      <TextField
        value={name ?? "Ningún archivo subido"}
        label={type.toUpperCase()}
        variant="outlined"
        placeholder="Ningún archivo subido"
        sx={{ paddingX: 2 }}
        aria-readonly
        fullWidth
      />
      <Button onClick={onDownloadFile}>
        <CloudDownload />
      </Button>
    </Box>
  );
};
