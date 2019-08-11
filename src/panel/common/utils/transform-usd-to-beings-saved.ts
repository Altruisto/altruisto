type charity = "AMF" | "SCI"

const costToSaveOneLifeInUSD = {
  AMF: 4.85,
  SCI: 1.19
}

function transformUSDToBeingsSaves(
  moneyInUSD: number,
  charity: charity
): number {
  const rawImpact = moneyInUSD / costToSaveOneLifeInUSD[charity]
  return rawImpact <= 1 ? 1 : Math.round(rawImpact)
}

export default transformUSDToBeingsSaves
