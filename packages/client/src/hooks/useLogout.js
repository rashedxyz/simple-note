import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axiosPrivate("/api/logout");
      setAuth({});
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
}

export default useLogout;
