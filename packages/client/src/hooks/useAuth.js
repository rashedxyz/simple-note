import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function useAuth() {
  const { auth, setAuth } = useContext(AuthContext);
  return { auth, setAuth };
}

export default useAuth;
