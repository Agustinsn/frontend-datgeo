import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface IUploadFileSection {
  type: "dni" | "licencia" | "cv";
}

export const UploadFileSection = ({ type }: IUploadFileSection) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert("Por favor, selecciona un archivo PDF.");
      setFile(null);
      setFileName("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("No has seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Input oculto para seleccionar el archivo */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        id="fileInput"
        style={{ display: "none" }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <label htmlFor="fileInput" style={{ width: "80%" }}>
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
          value={fileName}
          variant="outlined"
          placeholder="Ningún archivo seleccionado"
          aria-readonly
          fullWidth
        />
      </Box>
    </Box>
  );
};
