/* global chrome */
import React, { useCallback, useMemo, useState, useContext } from "react";
import axios from "../common/api";

export type User = {
  email: string;
  apiKey: string;
};

export type Auth = {
  isLoggedIn: boolean | undefined;
  user: User | undefined;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

export type AuthProviderProps = {
  children?: any;
};

export const AuthContext: React.Context<Auth> = React.createContext<Auth>({
  isLoggedIn: false,
  user: {
    email: "",
    apiKey: ""
  },
  login: () => {
    console.warn(
      "You are using auth context without initial values (login call)"
    );
    return new Promise(resolve => resolve(undefined));
  },
  logout: () => {
    console.warn(
      "You are using auth context without initial values (logout call)"
    );
    return new Promise(resolve => resolve());
  }
});

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}: AuthProviderProps) => {
  const getStoredUser = (): Promise<User | undefined> => {
    return new Promise(resolve => {
      if (process.env.NODE_ENV === "production") {
        chrome.storage.sync.get(["user"], function(result) {
          resolve(result.user);
        });
      } else {
        const storedUser = localStorage.getItem("user");
        storedUser === null
          ? resolve(undefined)
          : resolve(JSON.parse(storedUser));
      }
    });
  };

  const setStoredUser = (user: User | undefined): Promise<User> => {
    return new Promise(resolve => {
      if (process.env.NODE_ENV === "production") {
        chrome.storage.sync.set({ user }, () => {
          resolve(user);
          // chrome.storage.sync.get(["apiKey"], function(result) {
          //   console.log("Value currently is " + result.apiKey);
          // });
        });
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      }
    });
  };

  const removeStoredUser = (): Promise<null> => {
    return new Promise(resolve => {
      if (process.env.NODE_ENV === "production") {
        chrome.storage.sync.remove("user", () => {
          resolve(null);
        });
      } else {
        localStorage.removeItem("user");
        resolve(null);
      }
    });
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  if (typeof isLoggedIn === "undefined") {
    getStoredUser().then(storedUser => {
      if (typeof storedUser === "undefined") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setUser(storedUser);
      }
    });
  }

  const login = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      axios
        .post("/login", {
          username: email,
          password
        })
        .then(response => {
          if (
            response.status &&
            Number(response.status) === 200 &&
            response.data.apiKey
          ) {
            return setStoredUser({
              email,
              apiKey: response.data.apiKey
            }) as any; // typescript hack
          } else {
            reject(new Error("Technical problem. Please try again."));
          }
        })
        .then(storedUser => {
          setIsLoggedIn(true);
          setUser(storedUser);
          resolve(storedUser);
        })
        .catch(error => reject(error));
    });
  };

  const logout = (): Promise<void> => {
    return removeStoredUser().then(() => {
      setIsLoggedIn(false);
      setUser(undefined);
    });
  };

  const memoizedLogin = useCallback(login, []);
  const memoizedLogout = useCallback(logout, []);

  const memoizedAuth = useMemo(
    () => ({
      login: memoizedLogin,
      logout: memoizedLogout,
      isLoggedIn,
      user
    }),
    [user, isLoggedIn, memoizedLogin, memoizedLogout]
  );

  return (
    <AuthContext.Provider value={memoizedAuth}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
