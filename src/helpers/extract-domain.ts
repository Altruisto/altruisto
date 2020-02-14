import { get } from "psl"

export const extractDomain = (url: string) => get(url) || ""
