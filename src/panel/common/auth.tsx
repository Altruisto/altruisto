import * as browser from "webextension-polyfill"
import React, { useCallback, useMemo, useState, useContext } from "react"
import axios from "../../helpers/api"
import { User } from "../../types/types.ts"

export type Auth = {
  user: User | undefined
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children?: any
}

export const AuthContext: React.Context<Auth> = React.createContext<Auth>({
  user: {
    email: "",
    apiKey: ""
  },
  login: () => {
    console.warn(
      "You are using auth context without initial values (login call)"
    )
    return new Promise(resolve => resolve(undefined))
  },
  logout: () => {
    console.warn(
      "You are using auth context without initial values (logout call)"
    )
    return new Promise(resolve => resolve())
  }
})

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}: AuthProviderProps) => {
  const getStoredUser = (): Promise<User | undefined> => {
    if (process.env.NODE_ENV === "production") {
      return browser.storage.sync
        .get(["user"])
        .then((result: { user: User | undefined }) => result.user)
    } else {
      const storedUser = localStorage.getItem("user")
      return new Promise(resolve => {
        storedUser === null
          ? resolve(undefined)
          : resolve(JSON.parse(storedUser))
      })
    }
  }

  const setStoredUser = (user: User | undefined): Promise<User> => {
    if (process.env.NODE_ENV === "production") {
      return browser.storage.sync.set({ user }).then(() => user)
    } else {
      localStorage.setItem("user", JSON.stringify(user))
      return new Promise(resolve => resolve(user))
    }
  }

  const removeStoredUser = (): Promise<null> => {
    if (process.env.NODE_ENV === "production") {
      return browser.storage.sync.remove("user")
    } else {
      localStorage.removeItem("user")
      return new Promise(resolve => resolve(null))
    }
  }

  const [user, setUser] = useState<User | undefined>(undefined)

  if (typeof user === "undefined") {
    getStoredUser().then(storedUser => setUser(storedUser))
  }

  const login = (email: string, password: string): Promise<User> =>
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
          }) as any // typescript hack
        }
      })
      .then(storedUser => {
        setUser(storedUser)
        return storedUser
      })
      .catch(console.warn)

  const logout = (): Promise<void> => {
    return removeStoredUser().then(() => {
      setUser(undefined)
    })
  }

  const memoizedLogin = useCallback(login, [])
  const memoizedLogout = useCallback(logout, [])

  const memoizedAuth = useMemo(
    () => ({
      login: memoizedLogin,
      logout: memoizedLogout,
      user
    }),
    [user, memoizedLogin, memoizedLogout]
  )

  return (
    <AuthContext.Provider value={memoizedAuth}>{children}</AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
