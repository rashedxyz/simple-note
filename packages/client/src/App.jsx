import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
