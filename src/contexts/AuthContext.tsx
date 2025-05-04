
import { createContext, useContext, useState, ReactNode } from "react";
import { Roles, User } from "@/types";
import { mockUsers } from "@/services/mockData";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  isAdmin: boolean;
  isManager: boolean;
  isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Simple login - in real app would call API
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find user with matching email (in real app, this would be handled by backend)
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      // In a real app, password would be hashed and compared by backend
      setCurrentUser(user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Simple registration - in real app would call API
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    // In a real app, this would send data to backend to create a new user
    // Here we're just simulating success
    return true;
  };

  // Role-based helpers
  const isAdmin = currentUser?.role === Roles.ADMIN;
  const isManager = currentUser?.role === Roles.MANAGER;
  const isUser = currentUser?.role === Roles.USER;

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      register,
      isAdmin, 
      isManager, 
      isUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
