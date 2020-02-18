import { get as getMainDomain } from "psl"

const getHostname = (url: string) => {
  const matches = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/i)
  return matches ? matches[1] : url
}

export const extractDomain = (url: string) => getMainDomain(getHostname(url)) || ""
