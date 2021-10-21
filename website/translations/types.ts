import { en } from "./strings/en"

type Keys = keyof typeof en
export type Translation = Record<Keys, string>
