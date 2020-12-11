type Charity = "AMF" | "SCI"
type MoneyLeft = number

export const IMPACT_COST_IN_USD = {
  SCI: 1.19, // one child cured from parasites
  AMF: 2.43, // one person protected from malaria
  GD: 21.13 // one week of financial help for a family in extreme poverty
}

export type ImpactSpreadingResult = {
  [K in keyof typeof IMPACT_COST_IN_USD]: number
}

export const spreadUSDBetweenCharitiesForMaxImpact = (
  money: number
): [ImpactSpreadingResult, MoneyLeft] => {
  let moneyLeft = money
  const cheapestImpact = IMPACT_COST_IN_USD.SCI
  // Object.values(IMPACT_COST_IN_USD).sort((a,b) => a - b)[0]
  let result: ImpactSpreadingResult = {
    SCI: 0,
    AMF: 0,
    GD: 0
  }

  const buy = (charity: keyof typeof IMPACT_COST_IN_USD): void => {
    moneyLeft -= IMPACT_COST_IN_USD[charity]
    result[charity] += 1
  }

  while (moneyLeft >= cheapestImpact) {
    buy("SCI")
    if (moneyLeft >= IMPACT_COST_IN_USD["AMF"]) {
      buy("AMF")
    } else {
      continue
    }
    if (moneyLeft >= IMPACT_COST_IN_USD["GD"]) {
      buy("GD")
    } else {
      continue
    }
  }

  return [result, moneyLeft]
}

export const transformUSDToBeingsSaves = (moneyInUSD: number, charity: Charity): number => {
  const rawImpact = moneyInUSD / IMPACT_COST_IN_USD[charity]
  return rawImpact <= 1 ? 1 : Math.round(rawImpact)
}

export default transformUSDToBeingsSaves
