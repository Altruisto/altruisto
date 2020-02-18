import { browser } from "webextension-polyfill-ts"
import { CauseArea, Currency } from "../types/types"

export type LocalStorageSchema = {
  activatedAffiliates: ActivatedAffiliate[]
  closedWebsites: string[]
  disabledWebsites: string[]
  partners: string[]
  installationId: string
}

export type SyncStorageSchema = {
  ref: string
  referredBy: string
  privateNotifications: PrivateNotification[]
  publicNotifications: PublicNotifications
  showNotifications: boolean
  highlightSearchResults: boolean
  user: User | null
  userSettings: UserSettings | null
}

export type ActivatedAffiliate = { domain: string; timestamp: number }

type StringifiedNotification = string

export type PublicNotifications = {
  lastUpdated: string
  notificationsQueue: StringifiedNotification[]
}

export type PrivateNotification = {
  id: string
  content: StringifiedNotification
}

export type User = {
  email: string
  apiKey: string
}

export type UserSettings = {
  causeArea: CauseArea
  currency: Currency
}

const localStorageSchema: LocalStorageSchema = {
  installationId: "",
  partners: [],
  activatedAffiliates: [], // TODO: -> activatedPartners
  closedWebsites: [], // TODO: -> closedPartners
  disabledWebsites: [] // TODO: -> disabledPartners
}
const syncStorageSchema: SyncStorageSchema = {
  ref: "",
  referredBy: "",
  privateNotifications: [],
  publicNotifications: {
    lastUpdated: "0000-00-00",
    notificationsQueue: []
  },
  showNotifications: true, // TODO: -> extensionSettings.showNotifications
  highlightSearchResults: true, // TODO: -> extensionSettings.highlightSearchResults
  user: null,
  userSettings: null
}

const createStorage = <
  LocalStorage extends object,
  SyncStorage extends object,
  LocalStorageKey = keyof LocalStorage,
  SyncStorageKey = keyof SyncStorage
>(
  localStorageSchema: LocalStorage,
  syncStorageSchema: SyncStorage
) => {
  const get = <
    SA extends "local" | "sync",
    K extends LocalStorageKey | LocalStorageKey[] | SyncStorageKey | SyncStorageKey[]
  >(
    storageArea: SA,
    keys?: K
  ) => {
    if (!keys) {
      return browser.storage[storageArea].get() as Promise<
        SA extends "local" ? LocalStorage : SyncStorage
      >
    } else {
      return browser.storage[storageArea].get(keys) as Promise<
        SA extends "local"
          ? Pick<
              LocalStorage,
              K extends LocalStorageKey[]
                ? Extract<K[number], keyof LocalStorage>
                : Extract<K, keyof LocalStorage>
            >
          : Pick<
              SyncStorage,
              K extends SyncStorageKey[]
                ? Extract<K[number], keyof SyncStorage>
                : Extract<K, keyof SyncStorage>
            >
      >
    }
  }

  const set = <SA extends "local" | "sync">(
    storageArea: SA,
    update:
      | ((
          current: SA extends "local" ? LocalStorage : SyncStorage
        ) => SA extends "local" ? Partial<LocalStorage> : Partial<SyncStorage>)
      | ((
          current: SA extends "local" ? LocalStorage : SyncStorage
        ) => Promise<SA extends "local" ? Partial<LocalStorage> : Partial<SyncStorage>>)
      | (SA extends "local" ? Partial<LocalStorage> : Partial<SyncStorage>)
      | Promise<SA extends "local" ? Partial<LocalStorage> : Partial<SyncStorage>>
  ) => {
    if (typeof update === "function") {
      return get(storageArea).then(current =>
        Promise.resolve(update(current as SA extends "local" ? LocalStorage : SyncStorage)).then(
          newValues => browser.storage[storageArea].set(newValues)
        )
      )
    } else {
      return Promise.resolve(update).then(newValues => browser.storage[storageArea].set(newValues))
    }
  }

  set("local", localStorageSchema)
  set("sync", syncStorageSchema)

  return {
    get,
    set
  }
}

export const storage = createStorage(localStorageSchema, syncStorageSchema)
