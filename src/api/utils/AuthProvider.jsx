import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthTokenState] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("acessToken");
    if (token) {
      setAuthTokenState(token);
    }
  }, []);

  const login = (token, refreshToken) => {
    localStorage.setItem("accessToken", token)
    localStorage.setItem("refreshToken", refreshToken)
    setAuthTokenState(token);
  };

  const logout = () => {
    removeAuthToken();
    setAuthTokenState(null);
  };

  const isAuthenticated = () => {
    return !!authToken; 
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };