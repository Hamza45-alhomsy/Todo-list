import { createContext } from "react";

const AuthContext = createContext();
export function useAuth() {
  return AuthContext;
}
