import { ActivatedAffiliate } from "../types/types"

export const isAlreadyActivated = (
  activatedAffiliates: Array<ActivatedAffiliate>,
  domain: string
) => {
  const activated = activatedAffiliates.find(a => a.domain === domain)
  if (activated) {
    const activationEndTimestamp = activated.timestamp + 1000 * 60 * 60 * 24
    const currentTimestamp = Date.now()
    return activationEndTimestamp > currentTimestamp
  }
  return false
}
