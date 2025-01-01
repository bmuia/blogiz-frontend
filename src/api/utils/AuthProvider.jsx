import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthTokenState] = useState(null);
    const navigate = useNavigate(); 


    useEffect(() => {
      const token = localStorage.getItem("accessToken");
  
      if (token) {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000; // Decode and get expiration time in milliseconds
        const now = Date.now();
  
        if (expiry < now) {
          // Token has expired, remove token and log out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setAuthTokenState(null);
          navigate('/login');  // Redirect to login page
        } else {
          // Token is valid, set the auth token state
          setAuthTokenState(token);
        }
      } else {
        // If no token, log out
        setAuthTokenState(null);
      }
    }, [navigate]);

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