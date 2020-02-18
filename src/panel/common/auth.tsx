import React, { useCallback, useMemo, useState, useContext } from "react"
import axios from "../../helpers/api"
import { User, storage } from "../../helpers/storage"
import { CauseArea, Currency } from "../../types/types"

export type Auth = {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children?: any
}

type PostLoginResponse = {
  apiKey: string
}

type GetUserResponse = {
  id: number
  username: string
  email: string
  api_key: string
  cause_area: CauseArea
  money_raised: number
  currency: Currency
  created_at: string
  updated_at: string
  registration_source: string
  referrals_count: number
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

  if (typeof user === "undefined") {
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
    storage.set("sync", { user: null, userSettings: null }).then(() => setUser(null))

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
