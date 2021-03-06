import React, { useCallback, useMemo, useState, useContext, ReactNode } from "react"
import axios from "../../helpers/api"
import { User, storage } from "../../helpers/storage"
import { PostLoginResponse, GetUserResponse } from "../../../../shared/types/api"

export type Auth = {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children?: ReactNode
}

export const AuthContext: React.Context<Auth> = React.createContext<Auth>({
  user: {
    email: "",
    apiKey: ""
  },
  login: () => {
    console.warn("You are using auth context without initial values (login call)")
    return new Promise(resolve => resolve(undefined))
  },
  logout: () => {
    console.warn("You are using auth context without initial values (logout call)")
    return new Promise(resolve => resolve())
  }
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  if (!user) {
    storage.get("sync", "user").then(result => setUser(result.user))
  }

  const login = (email: string, password: string): Promise<User> =>
    axios
      .post<PostLoginResponse>("/login", {
        username: email,
        password
      })
      .then(response => {
        if (response.status && Number(response.status) === 200 && response.data.apiKey) {
          const user = {
            email,
            apiKey: response.data.apiKey
          }
          // should update ref and refferedBy!!!!!
          return storage.set("sync", { user }).then(() => user)
        } else {
          throw new Error("login() - server did not respond with status 200")
        }
      })
      .then(user => {
        setUser(user)
        return user
      })
      .then(user => {
        axios
          .get<GetUserResponse>("/user", {
            headers: {
              "X-AUTH-TOKEN": user.apiKey
            }
          })
          .then(response =>
            storage.set("sync", {
              userSettings: {
                causeArea: response.data.cause_area,
                currency: response.data.currency
              }
            })
          )
        return user
      })

  const logout = (): Promise<void> =>
    storage.reset("sync", ["userSettings", "user"]).then(() => setUser(null))

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

  return <AuthContext.Provider value={memoizedAuth}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
