import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import Oidc, { UserManager, User } from "oidc-client";

import { generateRedirectUri, OIDC_CONFIG } from "app/variables";
import useThrow from "hooks/useThrow";

Oidc.Log.logger = console;
const userManager = new UserManager(OIDC_CONFIG);

type AuthContextProps = {
  user: User;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextProps | null>(null);

type AuthProps = PropsWithChildren<{
  location?: Location;
  history?: History;
}>;

const Auth: React.FC<AuthProps> = ({
  children,
  location = window.location,
  history = window.history,
}) => {
  const throwError = useThrow();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Try to get user information
        const user = await userManager.getUser();
        if (!user || user.expired) {
          // User not authenticated -> trigger auth flow
          await userManager.signinRedirect({
            redirect_uri: generateRedirectUri(location.href),
          });
        } else {
          setUser(user);
        }
      } catch (error) {
        throwError(error);
      }
    };
    getUser();
  }, [location, history, throwError, setUser]);

  useEffect(() => {
    // Refreshing react state when new state is available in e.g. session storage
    const updateUserData = async () => {
      try {
        const user = await userManager.getUser();
        setUser(user);
      } catch (error) {
        throwError(error);
      }
    };

    userManager.events.addUserLoaded(updateUserData);

    // Unsubscribe on component unmount
    return () => userManager.events.removeUserLoaded(updateUserData);
  }, [throwError, setUser]);

  useEffect(() => {
    // Force log in if session cannot be renewed on background
    const handleSilentRenewError = async (error: Error) => {
      try {
        await userManager.signinRedirect({
          redirect_uri: generateRedirectUri(location.href),
        });
      } catch (error) {
        throwError(error);
      }
    };

    userManager.events.addSilentRenewError(handleSilentRenewError);

    // Unsubscribe on component unmount
    return () =>
      userManager.events.removeSilentRenewError(handleSilentRenewError);
  }, [location, throwError, setUser]);

  const logout = useCallback(() => {
    const handleLogout = async () => {
      await userManager.signoutRedirect();
    };
    handleLogout();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
