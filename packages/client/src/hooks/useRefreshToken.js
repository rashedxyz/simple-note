import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.get("/api/refresh");
    setAuth((prev) => {
      return {
        ...prev,
        email: response.data.email,
        role: response.data.role,
        accessToken: response.data.accessToken
      };
    });
  };

  return refresh;
};

export default useRefreshToken;
