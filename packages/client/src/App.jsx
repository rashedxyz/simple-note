import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
