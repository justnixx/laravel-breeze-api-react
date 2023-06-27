import { useContext } from "react";
import { AuthContext, AuthContextValues } from "../context/AuthContext";

export default function useAuthContext(): AuthContextValues {
  return useContext(AuthContext)
}
