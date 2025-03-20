import { Box, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../../components/UserForm/UserForm";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { getUserContex } from "../../utils/getUserContex";
import { useUserContext } from "../../utils/useUserContext";
import { blueGrey } from "@mui/material/colors";

export default function UserView() {
  const [formMode, setFormMode] = useState<"edit" | "view">("view");
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, editedUser, editedMessage, clear } = useUserContext();
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
        bgcolor={blueGrey[600]}
        textAlign={"center"}
        fontWeight={"bold"}
        padding={2}
        color="white"
      >
        <ArrowBackOutlinedIcon
          sx={{ cursor: "pointer" }}
          fontSize="large"
          onClick={() => navigate("/")}
        />
        <Box component={"span"} fontSize={26}>
          {user?.name} {user?.last_name}
        </Box>
        <EditIcon
          sx={{ cursor: "pointer" }}
          fontSize="large"
          onClick={() => setFormMode(formMode === "view" ? "edit" : "view")}
        />
      </Box>
      <UserForm idUser={Number(id)} mode={formMode} />
      <Snackbar
        open={editedUser}
        autoHideDuration={4000}
        onClose={() => clear()}
        message={editedMessage}
      />
    </Box>
  );
}
