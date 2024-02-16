import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error("error", error);
        navigate("/login");

      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return isLoading ? (
    <Spin />
  ) : (
    <div>
      <Outlet />
    </div>
  );
};

export default PersistLogin;
