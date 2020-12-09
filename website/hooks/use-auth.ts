import { User } from "../../shared/types/user"
import { useState, useCallback, useMemo, useEffect } from "react"
import { api } from "utils/api-url"
import { PostLoginResponse, GetUserResponse } from "../../shared/types/api"

type Auth = {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  logout: () => void
}

export const useAuth = (): Auth => {
  const [user, setUser] = useState<User | null>(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(JSON.parse(localStorage.getItem("user")) || null)
      setIsDataLoaded(true)
    }
  }, [])

  const login = (email: string, password: string): Promise<User> =>
    api
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
          localStorage.setItem("user", JSON.stringify(user))
          setUser(user)
          return user
        } else {
          throw new Error("login() - server did not respond with status 200")
        }
      })
      .then(user => {
        api
          .get<GetUserResponse>("/user", {
            headers: {
              "X-AUTH-TOKEN": user.apiKey
            }
          })
          .then(response => {
            localStorage.setItem(
              "userSettings",
              JSON.stringify({
                causeArea: response.data.cause_area,
                currency: response.data.currency
              })
            )
          })
          .catch(console.log)
        return user
      })

  const logout = (): void => {
    localStorage.setItem("user", null)
  }

  const memoLogin = useCallback(login, [])
  const memoLogout = useCallback(logout, [])

  const memoAuth = useMemo(
    () => ({
      login: memoLogin,
      logout: memoLogout,
      user,
      isDataLoaded
    }),
    [user, memoLogin, memoLogout, isDataLoaded]
  )

  return isDataLoaded ? memoAuth : null
}

export const useEffectWithAuth = (effect: (auth: Auth) => void, deps: any[]) => {
  const auth = useAuth()
  useEffect(() => {
    if (auth) {
      effect(auth)
    }
  }, [auth, ...deps])
}
