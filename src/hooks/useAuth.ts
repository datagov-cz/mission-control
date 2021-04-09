import { useContext } from "react";
import { AuthContext } from "components/Auth";

// The context value is never null -> see Auth component for details
const useAuth = () => useContext(AuthContext)!;

export default useAuth;
