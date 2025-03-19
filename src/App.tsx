import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import UserView from "./pages/UserView";
import { UserProvider } from "./context/UsersContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserView />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
