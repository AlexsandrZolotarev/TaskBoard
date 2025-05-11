import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  userEmail: string | null
  login: (email: string) => void;
  logout: () => void;
};
type Props = {
  children: ReactNode;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, SetIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("is-authenticated") === "true";
  });
    const [userEmail, SetUserEmail] = useState<string | null>(() => {
    return localStorage.getItem("user-email") || null;
  });
  const login = (email: string) => {
    SetIsAuthenticated(true);
    SetUserEmail(email);
    localStorage.setItem("is-authenticated", "true");
    localStorage.setItem("user-email",email);
  };
  const logout = () => {
    SetIsAuthenticated(false);
    SetUserEmail(null);
    localStorage.removeItem("is-authenticated");
    localStorage.removeItem("user-email");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,userEmail}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
