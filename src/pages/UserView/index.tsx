import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../../components/UserForm/UserForm";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { getUserContex } from "../../utils/getUserContex";
import { useUserContext } from "../../utils/useUserContext";

export default function UserView() {
  const [formMode, setFormMode] = useState<"edit" | "view">("view");
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUserContext();
  if (!id) {
    navigate("/");
    return null;
  }
  const user = getUserContex({ users, idUser: Number(id) });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "50%",
        }}
      >
        <ArrowBackOutlinedIcon
          sx={{ cursor: "pointer" }}
          fontSize="large"
          onClick={() => navigate("/")}
        />
        <h1>
          {user?.name} {user?.lastName}
        </h1>
        <EditIcon
          sx={{ cursor: "pointer" }}
          fontSize="large"
          onClick={() => setFormMode(formMode === "view" ? "edit" : "view")}
        />
      </Box>
      <UserForm idUser={Number(id)} mode={formMode} />
    </Box>
  );
}
