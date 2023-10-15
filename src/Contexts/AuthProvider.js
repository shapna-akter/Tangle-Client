  import jwt_decode from "jwt-decode";
  import React, { createContext, useEffect, useState } from "react";

  export const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isValidUser, setIsValidUser] = useState({});
    const [token, setToken] = useState("");

    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("accessToken");
        setToken(token);
        if (!token) {
          setLoading(false);
          return;
        }

        let userData = null;
        try {
          userData = jwt_decode(token);
        } catch (e) {
          console.error("Invalid token:", e);
          setLoading(false);
          return;
        }

        // Fetch user data from server to verify
        try {
          const response = await fetch("https://server.tanglecare.us/api/v1/getme", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          // console.log(data);
          if(userData?.email === data?.data?.email) {
            setIsValidUser(data?.data);
          }
          // setIsValidUser(data?.data);
        } catch (error) {
          console.error("Server verification failed:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();

    }, []);

    const updateUserState = (newState) => {
      setIsValidUser(newState);
    };

    return (
      <AuthContext.Provider
        value={{
          isValidUser,
          loading,
          token,
          updateUserState,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;
