"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Stored Token:", token);
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
    router.push("/#");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    router.push("/sign-in");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
