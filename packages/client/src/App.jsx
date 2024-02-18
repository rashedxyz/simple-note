import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PersistLogin from "./components/PersistLogin";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Missing from "./pages/Missing";
import CreateNote from "./pages/CreateNote";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
