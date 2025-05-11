import React, { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};
type Props = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(false);
  const login = () => SetIsAuthenticated(true);
  const logout = () => SetIsAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
