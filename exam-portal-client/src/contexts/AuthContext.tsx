import { createContext, useState, useEffect } from "react";
import { refreshToken } from '../apis/auth';


interface AuthContextType {
  user: { name: string; role: string } | null
  token: string | null
    login: (user: { name: string; role: string }, token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRefreshToken() {
      try {
        const response = await refreshToken();
        if (response && response.name && response.role && response.accessToken) {
          setUser({ name: response.name, role: response.role });
          setToken(response.accessToken);
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }
    fetchRefreshToken();
  }, []);

  const login = (userData: { name: string; role: string }, authToken: string) => {
    setUser(userData);
    setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;