export type StorageData = {
  activatedAffiliates: Array<ActivatedAffiliate>
  closedWebsites: string[]
  disabledWebsites: string[]
  partners: string[]
}

export type ActivatedAffiliate = { domain: string; timestamp: number }
